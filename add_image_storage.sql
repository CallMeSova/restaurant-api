-- =============================================
--  เพิ่มคอลัมน์ image_url ในตาราง menu_items
-- =============================================

ALTER TABLE menu_items
  ADD COLUMN IF NOT EXISTS image_url TEXT;

-- =============================================
--  สร้าง Storage Bucket สำหรับรูปเมนู
-- =============================================

-- สร้าง bucket ชื่อ "menu-images" แบบ public
INSERT INTO storage.buckets (id, name, public)
VALUES ('menu-images', 'menu-images', true)
ON CONFLICT (id) DO NOTHING;

-- เปิดสิทธิ์ให้ใครก็อ่าน (ดูรูป) ได้
CREATE POLICY "public can view menu images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'menu-images');

-- เปิดสิทธิ์ให้ authenticated user อัปโหลดได้
CREATE POLICY "authenticated can upload menu images"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'menu-images');
