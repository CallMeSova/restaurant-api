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
