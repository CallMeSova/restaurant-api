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

// POST /api/tables
export const createTable = async (req: Request, res: Response): Promise<void> => {
  const { table_number, capacity, status } = req.body;

  if (!table_number || capacity === undefined) {
    res.status(400).json({ success: false, message: 'Table number and capacity are required' });
    return;
  }

  const { data, error } = await supabase
    .from('tables')
    .insert([{ table_number, capacity, status: status || 'available' }])
    .select()
    .single();

  if (error) {
    res.status(500).json({ success: false, message: error.message });
    return;
  }

  res.status(201).json({ success: true, data });
};

// PUT /api/tables/:id
export const updateTable = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { table_number, capacity, status } = req.body;

  const { data, error } = await supabase
    .from('tables')
    .update({ table_number, capacity, status })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    res.status(500).json({ success: false, message: error.message });
    return;
  }

  if (!data) {
    res.status(404).json({ success: false, message: 'Table not found' });
    return;
  }

  res.json({ success: true, data });
};

// DELETE /api/tables/:id
export const deleteTable = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  const { error } = await supabase
    .from('tables')
    .delete()
    .eq('id', id);

  if (error) {
    res.status(500).json({ success: false, message: error.message });
    return;
  }

  res.json({ success: true, message: 'Table deleted successfully' });
};
