-- =============================================
--  SEED DATA: หมวดหมู่ และ เมนูอาหาร
--  วางในหน้า Supabase → SQL Editor แล้วกด Run
-- =============================================

-- ---- 1. หมวดหมู่อาหาร ----
INSERT INTO categories (name) VALUES
  ('อาหารจานหลัก'),
  ('อาหารเรียกน้ำย่อย'),
  ('อาหารทะเล'),
  ('เครื่องดื่ม'),
  ('ของหวาน');

-- ---- 2. เมนูอาหาร (ใช้ subquery ดึง id จาก name แทนการ hardcode) ----

INSERT INTO menu_items (category_id, name, description, price, is_available) VALUES

-- อาหารจานหลัก
  ((SELECT id FROM categories WHERE name = 'อาหารจานหลัก'), 'ข้าวผัดกุ้ง',        'ข้าวผัดกุ้งสด ใส่ไข่ หอมกระเทียม',                   85.00, true),
  ((SELECT id FROM categories WHERE name = 'อาหารจานหลัก'), 'ผัดกะเพราหมูสับ',    'หมูสับผัดกะเพราใบสด รสจัดจ้าน เสิร์ฟพร้อมไข่ดาว',    70.00, true),
  ((SELECT id FROM categories WHERE name = 'อาหารจานหลัก'), 'ต้มยำกุ้ง',          'ต้มยำกุ้งแม่น้ำ น้ำข้น รสเปรี้ยวเผ็ด',               120.00, true),
  ((SELECT id FROM categories WHERE name = 'อาหารจานหลัก'), 'แกงเขียวหวานไก่',    'แกงเขียวหวานไก่บ้าน ใส่มะเขือ กะทิสด',               90.00, true),
  ((SELECT id FROM categories WHERE name = 'อาหารจานหลัก'), 'ข้าวมันไก่',          'ข้าวมันไก่ต้ม น้ำซุปใส ซอสพิเศษ',                    65.00, true),
  ((SELECT id FROM categories WHERE name = 'อาหารจานหลัก'), 'ผัดไทยกุ้งสด',       'เส้นจันท์ผัดไทย กุ้งสดตัวใหญ่ ไข่ ถั่วงอก',          95.00, true),
  ((SELECT id FROM categories WHERE name = 'อาหารจานหลัก'), 'ข้าวผัดปู',           'ข้าวผัดเนื้อปู ไข่ขาว น้ำมันหอย',                   110.00, true),
  ((SELECT id FROM categories WHERE name = 'อาหารจานหลัก'), 'ต้มข่าไก่',           'ต้มข่าไก่กะทิสด ใส่เห็ด ใบมะกรูด',                   80.00, true),

-- อาหารเรียกน้ำย่อย
  ((SELECT id FROM categories WHERE name = 'อาหารเรียกน้ำย่อย'), 'ปอเปี๊ยะทอด',        'ปอเปี๊ยะทอดกรอบ ไส้ผักและหมู ซอสพลัม',          55.00, true),
  ((SELECT id FROM categories WHERE name = 'อาหารเรียกน้ำย่อย'), 'ไก่ทอดกระเทียม',     'ไก่ทอดชิ้นเล็ก กระเทียมพริกไทย กรอบนอกนุ่มใน',  75.00, true),
  ((SELECT id FROM categories WHERE name = 'อาหารเรียกน้ำย่อย'), 'ซุปข้าวโพด',          'ซุปข้าวโพดครีมข้น หอมละมุน',                    45.00, true),
  ((SELECT id FROM categories WHERE name = 'อาหารเรียกน้ำย่อย'), 'ไข่เจียวหมูสับ',     'ไข่เจียวฟู หมูสับ น้ำปลา',                       50.00, true),
  ((SELECT id FROM categories WHERE name = 'อาหารเรียกน้ำย่อย'), 'ทอดมันปลากราย',       'ทอดมันปลากราย เสิร์ฟพร้อมน้ำจิ้มอาจาด',          65.00, true),

-- อาหารทะเล
  ((SELECT id FROM categories WHERE name = 'อาหารทะเล'), 'ปลากะพงทอดน้ำปลา',    'ปลากะพงทอดน้ำปลา กรอบหอม มะม่วงซอย',           180.00, true),
  ((SELECT id FROM categories WHERE name = 'อาหารทะเล'), 'หอยแมลงภู่ผัดพริกเผา','หอยแมลงภู่นิวซีแลนด์ผัดพริกเผา ใบโหระพา',      150.00, true),
  ((SELECT id FROM categories WHERE name = 'อาหารทะเล'), 'กุ้งแม่น้ำเผา',        'กุ้งแม่น้ำเผาสด น้ำจิ้มซีฟู้ด',                220.00, true),
  ((SELECT id FROM categories WHERE name = 'อาหารทะเล'), 'ปูผัดผงกะหรี่',        'ปูม้าผัดผงกะหรี่ ไข่ หอมหัวใหญ่',              200.00, true),
  ((SELECT id FROM categories WHERE name = 'อาหารทะเล'), 'ยำทะเล',               'ยำรวมทะเล กุ้ง หมึก หอย รสเปรี้ยวเผ็ด',         130.00, true),

-- เครื่องดื่ม
  ((SELECT id FROM categories WHERE name = 'เครื่องดื่ม'), 'ชาไทยเย็น',    'ชาไทยรสเข้ม นมสด น้ำตาล เย็นจัด',   35.00, true),
  ((SELECT id FROM categories WHERE name = 'เครื่องดื่ม'), 'น้ำมะนาวโซดา', 'มะนาวสดหวานอมเปรี้ยว เติมโซดา',      30.00, true),
  ((SELECT id FROM categories WHERE name = 'เครื่องดื่ม'), 'โกโก้ร้อน',    'โกโก้แท้ หอมละมุน เสิร์ฟร้อน',       40.00, true),
  ((SELECT id FROM categories WHERE name = 'เครื่องดื่ม'), 'กาแฟเย็น',     'กาแฟโบราณเย็น นมข้นหวาน',            40.00, true),
  ((SELECT id FROM categories WHERE name = 'เครื่องดื่ม'), 'น้ำฝรั่งปั่น', 'ฝรั่งสดปั่น น้ำตาลน้อย',             45.00, true),
  ((SELECT id FROM categories WHERE name = 'เครื่องดื่ม'), 'ชานมไข่มุก',   'ชานม brown sugar ไข่มุกนุ่ม',         55.00, true),
  ((SELECT id FROM categories WHERE name = 'เครื่องดื่ม'), 'น้ำเปล่า',     'น้ำดื่มบริสุทธิ์',                    15.00, true),

-- ของหวาน
  ((SELECT id FROM categories WHERE name = 'ของหวาน'), 'ข้าวเหนียวมะม่วง', 'ข้าวเหนียวมูน มะม่วงน้ำดอกไม้ กะทิสด',   65.00, true),
  ((SELECT id FROM categories WHERE name = 'ของหวาน'), 'บัวลอยน้ำขิง',     'บัวลอยแป้งหลากสี น้ำขิงอุ่นหอม',           45.00, true),
  ((SELECT id FROM categories WHERE name = 'ของหวาน'), 'ไอศกรีมกะทิ',      'ไอศกรีมกะทิโฮมเมด ราดถั่วลิสงคั่ว',         50.00, true),
  ((SELECT id FROM categories WHERE name = 'ของหวาน'), 'วุ้นกะทิ',         'วุ้นกะทิเนื้อเนียน ราดน้ำเชื่อมใบเตย',      40.00, true),
  ((SELECT id FROM categories WHERE name = 'ของหวาน'), 'ทับทิมกรอบ',       'ทับทิมกรอบแช่อิ่ม กะทิสด น้ำแข็งใส',        45.00, true);
