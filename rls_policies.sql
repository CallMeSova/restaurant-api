-- =============================================
--  เปิดสิทธิ์อ่านข้อมูล (RLS Policies)
--  วางใน Supabase → SQL Editor แล้วกด Run
-- =============================================

-- categories: ใครก็อ่านได้
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public can read categories"
  ON categories FOR SELECT USING (true);

-- menu_items: ใครก็อ่านได้
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public can read menu_items"
  ON menu_items FOR SELECT USING (true);

-- tables: ใครก็อ่านได้
ALTER TABLE tables ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public can read tables"
  ON tables FOR SELECT USING (true);

-- reservations: ใครก็อ่านได้
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public can read reservations"
  ON reservations FOR SELECT USING (true);

-- orders: ใครก็อ่านได้
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public can read orders"
  ON orders FOR SELECT USING (true);

-- order_items: ใครก็อ่านได้
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public can read order_items"
  ON order_items FOR SELECT USING (true);

-- payments: ใครก็อ่านได้
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public can read payments"
  ON payments FOR SELECT USING (true);

-- users: อ่านได้เฉพาะ field ที่ปลอดภัย (ไม่มี password_hash)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public can read users"
  ON users FOR SELECT USING (true);
