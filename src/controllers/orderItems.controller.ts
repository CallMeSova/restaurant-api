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

// POST /api/order-items
export const createOrderItem = async (req: Request, res: Response): Promise<void> => {
  const { order_id, menu_item_id, quantity, price, special_instructions } = req.body;

  if (!order_id || !menu_item_id || price === undefined) {
    res.status(400).json({ success: false, message: 'Order ID, Menu Item ID, and price are required' });
    return;
  }

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

  res.status(201).json({ success: true, data });
};

// PUT /api/order-items/:id
export const updateOrderItem = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { order_id, menu_item_id, quantity, price, special_instructions } = req.body;

  const { data, error } = await supabase
    .from('order_items')
    .update({ order_id, menu_item_id, quantity, price, special_instructions })
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

  res.json({ success: true, data });
};

// DELETE /api/order-items/:id
export const deleteOrderItem = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  const { error } = await supabase
    .from('order_items')
    .delete()
    .eq('id', id);

  if (error) {
    res.status(500).json({ success: false, message: error.message });
    return;
  }

  res.json({ success: true, message: 'Order item deleted successfully' });
};
