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

// Helper function to handle table status release & order completion upon successful payment
const handlePaymentCompletion = async (orderId: number): Promise<void> => {
  // 1. Update order status to completed
  await supabase
    .from('orders')
    .update({ status: 'completed' })
    .eq('id', orderId);

  // 2. Fetch the table_id of this order
  const { data: order } = await supabase
    .from('orders')
    .select('table_id')
    .eq('id', orderId)
    .single();

  // 3. Set the table status to 'available'
  if (order && order.table_id) {
    await supabase
      .from('tables')
      .update({ status: 'available' })
      .eq('id', order.table_id);
  }
};

// POST /api/payments
export const createPayment = async (req: Request, res: Response): Promise<void> => {
  const { order_id, amount, payment_method, status, paid_at } = req.body;

  if (!order_id || amount === undefined || !payment_method) {
    res.status(400).json({ success: false, message: 'Order ID, amount, and payment method are required' });
    return;
  }

  const { data, error } = await supabase
    .from('payments')
    .insert([{
      order_id,
      amount,
      payment_method,
      status: status || 'pending',
      paid_at: paid_at || new Date().toISOString()
    }])
    .select()
    .single();

  if (error) {
    res.status(500).json({ success: false, message: error.message });
    return;
  }

  // หากสถานะชำระเงินสำเร็จ ให้เคลียร์โต๊ะและปรับสถานะออเดอร์เป็นเสร็จสิ้น
  if (data && data.status === 'completed') {
    await handlePaymentCompletion(order_id);
  }

  res.status(201).json({ success: true, data });
};

// PUT /api/payments/:id
export const updatePayment = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { order_id, amount, payment_method, status, paid_at } = req.body;

  const { data, error } = await supabase
    .from('payments')
    .update({ order_id, amount, payment_method, status, paid_at })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    res.status(500).json({ success: false, message: error.message });
    return;
  }

  if (!data) {
    res.status(404).json({ success: false, message: 'Payment not found' });
    return;
  }

  // หากสถานะชำระเงินสำเร็จ ให้เคลียร์โต๊ะและปรับสถานะออเดอร์เป็นเสร็จสิ้น
  if (data.status === 'completed') {
    const targetOrderId = order_id || data.order_id;
    await handlePaymentCompletion(targetOrderId);
  }

  res.json({ success: true, data });
};

