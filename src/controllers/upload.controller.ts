import { Request, Response } from 'express';
import { supabase } from '../config/supabase';

// POST /api/menu-items/:id/upload-image
// Body: multipart/form-data  field: "image" (file)
export const uploadMenuImage = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  if (!req.file) {
    res.status(400).json({ success: false, message: 'ไม่พบไฟล์รูปภาพ (field: image)' });
    return;
  }

  const file = req.file;
  const ext = file.originalname.split('.').pop();
  const fileName = `menu-${id}-${Date.now()}.${ext}`;

  // อัปโหลดไปยัง Supabase Storage bucket "menu-images"
  const { error: uploadError } = await supabase.storage
    .from('menu-images')
    .upload(fileName, file.buffer, {
      contentType: file.mimetype,
      upsert: true,
    });

  if (uploadError) {
    res.status(500).json({ success: false, message: uploadError.message });
    return;
  }

  // ดึง public URL ของรูป
  const { data: urlData } = supabase.storage
    .from('menu-images')
    .getPublicUrl(fileName);

  const imageUrl = urlData.publicUrl;

  // อัปเดต image_url ในตาราง menu_items
  const { data, error: updateError } = await supabase
    .from('menu_items')
    .update({ image_url: imageUrl })
    .eq('id', id)
    .select()
    .single();

  if (updateError) {
    res.status(500).json({ success: false, message: updateError.message });
    return;
  }

  res.json({ success: true, data });
};
