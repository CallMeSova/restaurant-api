import { Request, Response } from 'express';
import { supabase } from '../config/supabase';

// GET /api/users
export const getUsers = async (_req: Request, res: Response): Promise<void> => {
  const { data, error } = await supabase
    .from('users')
    .select('id, username, name, role, created_at');

  if (error) {
    res.status(500).json({ success: false, message: error.message });
    return;
  }
  res.json({ success: true, data });
};

// GET /api/users/:id
export const getUserById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { data, error } = await supabase
    .from('users')
    .select('id, username, name, role, created_at')
    .eq('id', id)
    .single();

  if (error) {
    res.status(404).json({ success: false, message: error.message });
    return;
  }
  res.json({ success: true, data });
};
