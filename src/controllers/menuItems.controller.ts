import { Request, Response } from 'express';
import { supabase } from '../config/supabase';

// GET /api/menu-items
export const getMenuItems = async (req: Request, res: Response): Promise<void> => {
  let query = supabase
    .from('menu_items')
    .select(`
      *,
      categories (
        id,
        name
      )
    `)
    .order('name');

  // Filter by category_id if provided
  if (req.query.category_id) {
    query = query.eq('category_id', req.query.category_id as string);
  }

  // Filter by availability if provided
  if (req.query.available !== undefined) {
    query = query.eq('is_available', req.query.available === 'true');
  }

  const { data, error } = await query;

  if (error) {
    res.status(500).json({ success: false, message: error.message });
    return;
  }
  res.json({ success: true, data });
};

// GET /api/menu-items/:id
export const getMenuItemById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { data, error } = await supabase
    .from('menu_items')
    .select(`
      *,
      categories (
        id,
        name
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
