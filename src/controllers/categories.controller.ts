import { Request, Response } from 'express';
import { supabase } from '../config/supabase';

// GET /api/categories
export const getCategories = async (_req: Request, res: Response): Promise<void> => {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name');

  if (error) {
    res.status(500).json({ success: false, message: error.message });
    return;
  }
  res.json({ success: true, data });
};

// GET /api/categories/:id
export const getCategoryById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    res.status(404).json({ success: false, message: error.message });
    return;
  }
  res.json({ success: true, data });
};

// POST /api/categories
export const createCategory = async (req: Request, res: Response): Promise<void> => {
  const { name } = req.body;

  if (!name) {
    res.status(400).json({ success: false, message: 'Name is required' });
    return;
  }

  const { data, error } = await supabase
    .from('categories')
    .insert([{ name }])
    .select()
    .single();

  if (error) {
    res.status(500).json({ success: false, message: error.message });
    return;
  }

  res.status(201).json({ success: true, data });
};

// PUT /api/categories/:id
export const updateCategory = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { name } = req.body;

  const { data, error } = await supabase
    .from('categories')
    .update({ name })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    res.status(500).json({ success: false, message: error.message });
    return;
  }

  if (!data) {
    res.status(404).json({ success: false, message: 'Category not found' });
    return;
  }

  res.json({ success: true, data });
};

// DELETE /api/categories/:id
export const deleteCategory = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  const { error } = await supabase
    .from('categories')
    .delete()
    .eq('id', id);

  if (error) {
    res.status(500).json({ success: false, message: error.message });
    return;
  }

  res.json({ success: true, message: 'Category deleted successfully' });
};
