import { Request, Response } from 'express';
import { supabase } from '../config/supabase';

// GET /api/tables
export const getTables = async (_req: Request, res: Response): Promise<void> => {
  const { data, error } = await supabase
    .from('tables')
    .select('*')
    .order('table_number');

  if (error) {
    res.status(500).json({ success: false, message: error.message });
    return;
  }
  res.json({ success: true, data });
};

// GET /api/tables/:id
export const getTableById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { data, error } = await supabase
    .from('tables')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    res.status(404).json({ success: false, message: error.message });
    return;
  }
  res.json({ success: true, data });
};

// GET /api/tables/status/:status
export const getTablesByStatus = async (req: Request, res: Response): Promise<void> => {
  const { status } = req.params;
  const { data, error } = await supabase
    .from('tables')
    .select('*')
    .eq('status', status)
    .order('table_number');

  if (error) {
    res.status(500).json({ success: false, message: error.message });
    return;
  }
  res.json({ success: true, data });
};
