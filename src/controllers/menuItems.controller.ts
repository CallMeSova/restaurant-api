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

// POST /api/menu-items
export const createMenuItem = async (req: Request, res: Response): Promise<void> => {
  const { category_id, name, description, price, is_available } = req.body;

  if (!name || price === undefined) {
    res.status(400).json({ success: false, message: 'Name and price are required' });
    return;
  }

  const { data, error } = await supabase
    .from('menu_items')
    .insert([{ category_id, name, description, price, is_available }])
    .select()
    .single();

  if (error) {
    res.status(500).json({ success: false, message: error.message });
    return;
  }

  res.status(201).json({ success: true, data });
};

// PUT /api/menu-items/:id
export const updateMenuItem = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { category_id, name, description, price, is_available } = req.body;

  const { data, error } = await supabase
    .from('menu_items')
    .update({ category_id, name, description, price, is_available })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    res.status(500).json({ success: false, message: error.message });
    return;
  }

  if (!data) {
    res.status(404).json({ success: false, message: 'Menu item not found' });
    return;
  }

  res.json({ success: true, data });
};

// DELETE /api/menu-items/:id
export const deleteMenuItem = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  const { error } = await supabase
    .from('menu_items')
    .delete()
    .eq('id', id);

  if (error) {
    res.status(500).json({ success: false, message: error.message });
    return;
  }

  res.json({ success: true, message: 'Menu item deleted successfully' });
};
