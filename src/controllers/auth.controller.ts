import { Request, Response } from 'express';
import { supabase } from '../config/supabase';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const getJwtSecret = (): string => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    console.warn('⚠️ Warning: JWT_SECRET is missing in environment variables. Using fallback secret.');
    return 'restaurant_api_default_secret_key_fallback_12345';
  }
  return secret;
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body || {};

  if (!username || !password) {
    res.status(400).json({ success: false, message: 'Username and password are required' });
    return;
  }

  // Find user by username
  const { data: user, error } = await supabase
    .from('users')
    .select('*')
    .eq('username', username)
    .single();

  if (error || !user) {
    res.status(401).json({ success: false, message: 'Invalid username or password' });
    return;
  }

  // Compare passwords
  const isMatch = await bcrypt.compare(password, user.password_hash);
  if (!isMatch) {
    res.status(401).json({ success: false, message: 'Invalid username or password' });
    return;
  }

  // Check role
  if (user.role !== 'admin') {
    res.status(403).json({ success: false, message: 'Access denied: Admin role required' });
    return;
  }

  // Generate JWT
  const token = jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    getJwtSecret(),
    { expiresIn: '24h' }
  );

  res.json({
    success: true,
    message: 'Login successful',
    data: {
      user: {
        id: user.id,
        username: user.username,
        name: user.name,
        role: user.role,
      },
      token
    }
  });
};

export const createInitialAdmin = async (req: Request, res: Response): Promise<void> => {
  const { username, password, name } = req.body || {};

  if (!username || !password || !name) {
    res.status(400).json({ success: false, message: 'Username, password, and name are required' });
    return;
  }

  // Check if any admin already exists to prevent public abuse (optional but good practice)
  const { data: admins } = await supabase.from('users').select('id').eq('role', 'admin').limit(1);
  if (admins && admins.length > 0) {
    res.status(403).json({ success: false, message: 'An admin already exists. Cannot create initial admin.' });
    return;
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const password_hash = await bcrypt.hash(password, salt);

  const { data, error } = await supabase
    .from('users')
    .insert([{ username, password_hash, name, role: 'admin' }])
    .select('id, username, name, role')
    .single();

  if (error) {
    res.status(500).json({ success: false, message: error.message });
    return;
  }

  res.status(201).json({ success: true, message: 'Admin created successfully', data });
};
