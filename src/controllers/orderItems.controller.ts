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
