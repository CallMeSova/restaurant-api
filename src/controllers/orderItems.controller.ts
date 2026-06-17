import { Request, Response } from 'express';
import { supabase } from '../config/supabase';

// GET /api/order-items
export const getOrderItems = async (req: Request, res: Response): Promise<void> => {
  let query = supabase
    .from('order_items')
    .select(`
      *,
      orders (
        id,
        status,
        created_at
      ),
      menu_items (
        id,
        name,
        price
      )
    `);

  // Filter by order_id if provided
  if (req.query.order_id) {
    query = query.eq('order_id', req.query.order_id as string);
  }

  const { data, error } = await query;

  if (error) {
    res.status(500).json({ success: false, message: error.message });
    return;
  }
  res.json({ success: true, data });
};

// GET /api/order-items/:id
export const getOrderItemById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { data, error } = await supabase
    .from('order_items')
    .select(`
      *,
      orders (
        id,
        status,
        created_at
      ),
      menu_items (
        id,
        name,
        price
      )
    `)
    .eq('id', id)
    .single();

  if (error) {
    res.status(404).json({ success: false, message: error.message });
    return;
  }
  res.json({ success: true, data });
};

// Helper function to recalculate the total_amount in the orders table
export const recalculateOrderTotal = async (orderId: number): Promise<void> => {
  const { data: items, error } = await supabase
    .from('order_items')
    .select('price, quantity')
    .eq('order_id', orderId);

  if (error) {
    console.error('💥 Error fetching order items for total recalculation:', error);
    return;
  }

  const total = items ? items.reduce((sum, item) => sum + (Number(item.price) * item.quantity), 0) : 0;

  const { error: updateError } = await supabase
    .from('orders')
    .update({ total_amount: total })
    .eq('id', orderId);

  if (updateError) {
    console.error('💥 Error updating order total amount:', updateError);
  }
};

// POST /api/order-items
export const createOrderItem = async (req: Request, res: Response): Promise<void> => {
  const { order_id, menu_item_id, quantity, special_instructions } = req.body;

  if (!order_id || !menu_item_id) {
    res.status(400).json({ success: false, message: 'Order ID and Menu Item ID are required' });
    return;
  }

  // ดึงราคาจริงจากตาราง menu_items เพื่อป้องกันการใส่ราคาปลอมจากฝั่ง Client
  const { data: menuItem, error: menuError } = await supabase
    .from('menu_items')
    .select('price')
    .eq('id', menu_item_id)
    .single();

  if (menuError || !menuItem) {
    res.status(404).json({ success: false, message: 'Menu item not found' });
    return;
  }

  const price = menuItem.price;

  const { data, error } = await supabase
    .from('order_items')
    .insert([{
      order_id,
      menu_item_id,
      quantity: quantity || 1,
      price,
      special_instructions
    }])
    .select()
    .single();

  if (error) {
    res.status(500).json({ success: false, message: error.message });
    return;
  }

  // คำนวณยอดรวมออเดอร์ใหม่
  await recalculateOrderTotal(order_id);

  res.status(201).json({ success: true, data });
};

// PUT /api/order-items/:id
export const updateOrderItem = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { order_id, menu_item_id, quantity, special_instructions } = req.body;

  // ค้นหารายการดั้งเดิมก่อน
  const { data: currentItem, error: fetchError } = await supabase
    .from('order_items')
    .select('order_id, menu_item_id')
    .eq('id', id)
    .single();

  if (fetchError || !currentItem) {
    res.status(404).json({ success: false, message: 'Order item not found' });
    return;
  }

  let price: number | undefined;
  const targetMenuItemId = menu_item_id || currentItem.menu_item_id;

  // หากมีการเปลี่ยนเมนูอาหาร ให้ดึงราคาของเมนูใหม่มาอัปเดตด้วย
  if (menu_item_id && menu_item_id !== currentItem.menu_item_id) {
    const { data: menuItem, error: menuError } = await supabase
      .from('menu_items')
      .select('price')
      .eq('id', targetMenuItemId)
      .single();

    if (menuError || !menuItem) {
      res.status(404).json({ success: false, message: 'Menu item not found' });
      return;
    }
    price = menuItem.price;
  }

  const { data, error } = await supabase
    .from('order_items')
    .update({
      order_id,
      menu_item_id,
      quantity,
      price,
      special_instructions
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    res.status(500).json({ success: false, message: error.message });
    return;
  }

  if (!data) {
    res.status(404).json({ success: false, message: 'Order item not found' });
    return;
  }

  // คำนวณยอดรวมออเดอร์ใหม่ (ทั้งออเดอร์เดิมและออเดอร์ใหม่เผื่อมีการย้าย order_id)
  await recalculateOrderTotal(currentItem.order_id);
  if (order_id && order_id !== currentItem.order_id) {
    await recalculateOrderTotal(order_id);
  }

  res.json({ success: true, data });
};

// DELETE /api/order-items/:id
export const deleteOrderItem = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  // ค้นหาเพื่อเอายอดรวมของออเดอร์เดิม
  const { data: currentItem, error: fetchError } = await supabase
    .from('order_items')
    .select('order_id')
    .eq('id', id)
    .single();

  if (fetchError || !currentItem) {
    res.status(404).json({ success: false, message: 'Order item not found' });
    return;
  }

  const { error } = await supabase
    .from('order_items')
    .delete()
    .eq('id', id);

  if (error) {
    res.status(500).json({ success: false, message: error.message });
    return;
  }

  // คำนวณยอดรวมออเดอร์ใหม่หลังจากลบรายการออกแล้ว
  await recalculateOrderTotal(currentItem.order_id);

  res.json({ success: true, message: 'Order item deleted successfully' });
};

