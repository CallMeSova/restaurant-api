import { Request, Response } from 'express';
import { supabase } from '../config/supabase';

// GET /api/reservations
export const getReservations = async (req: Request, res: Response): Promise<void> => {
  let query = supabase
    .from('reservations')
    .select(`
      *,
      tables (
        id,
        table_number,
        capacity
      )
    `)
    .order('reservation_time');

  // Filter by status if provided
  if (req.query.status) {
    query = query.eq('status', req.query.status as string);
  }

  const { data, error } = await query;

  if (error) {
    res.status(500).json({ success: false, message: error.message });
    return;
  }
  res.json({ success: true, data });
};

// GET /api/reservations/:id
export const getReservationById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { data, error } = await supabase
    .from('reservations')
    .select(`
      *,
      tables (
        id,
        table_number,
        capacity
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

// POST /api/reservations
export const createReservation = async (req: Request, res: Response): Promise<void> => {
  const { table_id, customer_name, customer_phone, reservation_time, status } = req.body;

  if (!table_id || !customer_name || !customer_phone || !reservation_time) {
    res.status(400).json({
      success: false,
      message: 'Table ID, customer name, customer phone, and reservation time are required'
    });
    return;
  }

  const { data, error } = await supabase
    .from('reservations')
    .insert([{
      table_id,
      customer_name,
      customer_phone,
      reservation_time,
      status: status || 'pending'
    }])
    .select()
    .single();

  if (error) {
    res.status(500).json({ success: false, message: error.message });
    return;
  }

  // อัปเดตสถานะของโต๊ะอาหารเป็น 'reserved' หากโต๊ะไม่ได้ถูกนั่งอยู่ (occupied)
  if (table_id) {
    const { data: table } = await supabase
      .from('tables')
      .select('status')
      .eq('id', table_id)
      .single();

    if (table && table.status !== 'occupied') {
      await supabase
        .from('tables')
        .update({ status: 'reserved' })
        .eq('id', table_id);
    }
  }

  res.status(201).json({ success: true, data });
};

// PUT /api/reservations/:id
export const updateReservation = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { table_id, customer_name, customer_phone, reservation_time, status } = req.body;

  const { data, error } = await supabase
    .from('reservations')
    .update({ table_id, customer_name, customer_phone, reservation_time, status })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    res.status(500).json({ success: false, message: error.message });
    return;
  }

  if (!data) {
    res.status(404).json({ success: false, message: 'Reservation not found' });
    return;
  }

  res.json({ success: true, data });
};

// DELETE /api/reservations/:id
export const deleteReservation = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  const { error } = await supabase
    .from('reservations')
    .delete()
    .eq('id', id);

  if (error) {
    res.status(500).json({ success: false, message: error.message });
    return;
  }

  res.json({ success: true, message: 'Reservation deleted successfully' });
};
