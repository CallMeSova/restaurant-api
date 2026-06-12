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
