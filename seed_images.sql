-- =============================================
--  เพิ่ม image_url ให้เมนูอาหารทุกรายการ
--  วางใน Supabase → SQL Editor แล้วกด Run
--  (ต้องรัน seed.sql และ add_image_storage.sql ก่อน)
-- =============================================

UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1603073163308-9654c3b70d09?w=400&q=80'
  WHERE name = 'ข้าวผัดกุ้ง';

UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=400&q=80'
  WHERE name = 'ผัดกะเพราหมูสับ';

UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1547592180-85f173990554?w=400&q=80'
  WHERE name = 'ต้มยำกุ้ง';

UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=400&q=80'
  WHERE name = 'แกงเขียวหวานไก่';

UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1604908176997-a43df8f96bf7?w=400&q=80'
  WHERE name = 'ข้าวมันไก่';

UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=400&q=80'
  WHERE name = 'ผัดไทยกุ้งสด';

UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1567620776882-c20be8ad2721?w=400&q=80'
  WHERE name = 'ข้าวผัดปู';

UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&q=80'
  WHERE name = 'ต้มข่าไก่';

-- อาหารเรียกน้ำย่อย
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1548943487-a2e4e43b4853?w=400&q=80'
  WHERE name = 'ปอเปี๊ยะทอด';

UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1598103442097-8b74394b95c8?w=400&q=80'
  WHERE name = 'ไก่ทอดกระเทียม';

UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?w=400&q=80'
  WHERE name = 'ซุปข้าวโพด';

UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1510693206972-df098062cb71?w=400&q=80'
  WHERE name = 'ไข่เจียวหมูสับ';

UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1625938144755-652e08e359b7?w=400&q=80'
  WHERE name = 'ทอดมันปลากราย';

-- อาหารทะเล
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400&q=80'
  WHERE name = 'ปลากะพงทอดน้ำปลา';

UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1534482421-64566f976cfa?w=400&q=80'
  WHERE name = 'หอยแมลงภู่ผัดพริกเผา';

UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=400&q=80'
  WHERE name = 'กุ้งแม่น้ำเผา';

UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1559847844-5315695dadae?w=400&q=80'
  WHERE name = 'ปูผัดผงกะหรี่';

UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1604909052743-94e838986d24?w=400&q=80'
  WHERE name = 'ยำทะเล';

-- เครื่องดื่ม
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&q=80'
  WHERE name = 'ชาไทยเย็น';

UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=400&q=80'
  WHERE name = 'น้ำมะนาวโซดา';

UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?w=400&q=80'
  WHERE name = 'โกโก้ร้อน';

UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&q=80'
  WHERE name = 'กาแฟเย็น';

UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&q=80'
  WHERE name = 'น้ำฝรั่งปั่น';

UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1558857563-b371033873b8?w=400&q=80'
  WHERE name = 'ชานมไข่มุก';

UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&q=80'
  WHERE name = 'น้ำเปล่า';

-- ของหวาน
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1562802378-063ec186a863?w=400&q=80'
  WHERE name = 'ข้าวเหนียวมะม่วง';

UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1583835746434-cf1534674b41?w=400&q=80'
  WHERE name = 'บัวลอยน้ำขิง';

UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1580915411954-282cb1b0d780?w=400&q=80'
  WHERE name = 'ไอศกรีมกะทิ';

UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&q=80'
  WHERE name = 'วุ้นกะทิ';

UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2?w=400&q=80'
  WHERE name = 'ทับทิมกรอบ';

-- ตรวจสอบผล
SELECT name, image_url FROM menu_items ORDER BY category_id, name;
