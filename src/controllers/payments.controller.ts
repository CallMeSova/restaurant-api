import { Request, Response } from 'express';
import { supabase } from '../config/supabase';

// GET /api/payments
export const getPayments = async (req: Request, res: Response): Promise<void> => {
  let query = supabase
    .from('payments')
    .select(`
      *,
      orders (
        id,
        total_amount,
        status,
        created_at,
        tables (
          id,
          table_number
        )
      )
    `)
    .order('paid_at', { ascending: false });

  // Filter by status if provided
  if (req.query.status) {
    query = query.eq('status', req.query.status as string);
  }

  // Filter by payment_method if provided
  if (req.query.method) {
    query = query.eq('payment_method', req.query.method as string);
  }

  const { data, error } = await query;

  if (error) {
    res.status(500).json({ success: false, message: error.message });
    return;
  }
  res.json({ success: true, data });
};

// GET /api/payments/:id
export const getPaymentById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { data, error } = await supabase
    .from('payments')
    .select(`
      *,
      orders (
        id,
        total_amount,
        status,
        created_at,
        tables (
          id,
          table_number
        ),
        users (
          id,
          name
        )
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
