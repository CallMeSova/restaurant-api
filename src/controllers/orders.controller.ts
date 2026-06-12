import { Request, Response } from 'express';
import { supabase } from '../config/supabase';

// GET /api/orders
export const getOrders = async (req: Request, res: Response): Promise<void> => {
  let query = supabase
    .from('orders')
    .select(`
      *,
      tables (
        id,
        table_number
      ),
      users (
        id,
        name,
        role
      ),
      order_items (
        id,
        quantity,
        price,
        special_instructions,
        menu_items (
          id,
          name
        )
      )
    `)
    .order('created_at', { ascending: false });

  // Filter by status if provided
  if (req.query.status) {
    query = query.eq('status', req.query.status as string);
  }

  // Filter by table_id if provided
  if (req.query.table_id) {
    query = query.eq('table_id', req.query.table_id as string);
  }

  const { data, error } = await query;

  if (error) {
    res.status(500).json({ success: false, message: error.message });
    return;
  }
  res.json({ success: true, data });
};

// GET /api/orders/:id
export const getOrderById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { data, error } = await supabase
    .from('orders')
    .select(`
      *,
      tables (
        id,
        table_number
      ),
      users (
        id,
        name,
        role
      ),
      order_items (
        id,
        quantity,
        price,
        special_instructions,
        menu_items (
          id,
          name,
          description
        )
      ),
      payments (
        id,
        amount,
        payment_method,
        status,
        paid_at
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

// POST /api/orders
export const createOrder = async (req: Request, res: Response): Promise<void> => {
  const { table_id, user_id, total_amount, status } = req.body;

  const { data, error } = await supabase
    .from('orders')
    .insert([{
      table_id,
      user_id,
      total_amount: total_amount || 0.00,
      status: status || 'pending'
    }])
    .select()
    .single();

  if (error) {
    res.status(500).json({ success: false, message: error.message });
    return;
  }

  res.status(201).json({ success: true, data });
};

// PUT /api/orders/:id
export const updateOrder = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { table_id, user_id, total_amount, status } = req.body;

  const { data, error } = await supabase
    .from('orders')
    .update({ table_id, user_id, total_amount, status })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    res.status(500).json({ success: false, message: error.message });
    return;
  }

  if (!data) {
    res.status(404).json({ success: false, message: 'Order not found' });
    return;
  }

  res.json({ success: true, data });
};

// DELETE /api/orders/:id
export const deleteOrder = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  const { error } = await supabase
    .from('orders')
    .delete()
    .eq('id', id);

  if (error) {
    res.status(500).json({ success: false, message: error.message });
    return;
  }

  res.json({ success: true, message: 'Order deleted successfully' });
};
