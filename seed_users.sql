-- =============================================
--  CLEAR AND SEED USERS (1 user per role)
--  วางในหน้า Supabase → SQL Editor แล้วกด Run
-- =============================================

-- 1. เคลียร์ข้อมูลผู้ใช้งานทั้งหมดและเริ่มนับ ID ใหม่
TRUNCATE TABLE users RESTART IDENTITY CASCADE;

-- 2. สร้างผู้ใช้งานใหม่สำหรับแต่ละตำแหน่ง (รหัสผ่านคือ password123 สำหรับทุกบัญชี)
-- Hash ของ 'password123' คือ '$2a$10$DIIBsaVVKSwNJCJkqti0luz62bOG.ja7FZY848EVtPWieQoCF2uie'
INSERT INTO users (username, password_hash, name, role) VALUES
  ('admin', '$2a$10$DIIBsaVVKSwNJCJkqti0luz62bOG.ja7FZY848EVtPWieQoCF2uie', 'System Admin', 'admin'),
  ('manager', '$2a$10$DIIBsaVVKSwNJCJkqti0luz62bOG.ja7FZY848EVtPWieQoCF2uie', 'Store Manager', 'manager'),
  ('chef', '$2a$10$DIIBsaVVKSwNJCJkqti0luz62bOG.ja7FZY848EVtPWieQoCF2uie', 'Head Chef', 'chef'),
  ('waiter', '$2a$10$DIIBsaVVKSwNJCJkqti0luz62bOG.ja7FZY848EVtPWieQoCF2uie', 'Waiter Staff', 'waiter'),
  ('customer', '$2a$10$DIIBsaVVKSwNJCJkqti0luz62bOG.ja7FZY848EVtPWieQoCF2uie', 'Regular Customer', 'customer');
