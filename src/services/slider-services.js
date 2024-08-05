"use server";

import { currentRole } from "../lib/current-user";
import { db } from "../lib/db";

// Kullanıcının admin olup olmadığını kontrol eden fonksiyon
const checkAdmin = async () => {
  const role = await currentRole();
  if (role !== 'ADMIN') {
    
    throw new Error('Bu işlem sadece admin kullanıcılar tarafından yapılabilir.');
  }
};

// Yeni slider ekleme fonksiyonu
export const addSlider = async (slider) => {
  await checkAdmin();
  try {
    // Yeni slider nesnesi oluştur
    const newSlider = {
      slider_title: slider.slider_title,
      slider_image: slider.slider_image,
    };
    // Slider'ı veritabanına ekle
    const addedSlider = await db.slider.create({ data: newSlider });
    return addedSlider;
  } catch (error) {
    console.error("Slider ekleme hatası: ", error);
    throw error;
  }
};

// Tüm sliderları getirme fonksiyonu
export const getAllSlider = async () => {
  const sliders = await db.slider.findMany();
  return sliders;
};

// İd'ye göre slider silme fonksiyonu
export const deleteSliderById = async (id) => {
  await checkAdmin();
  try {
    await db.slider.delete({
      where: { id },
    });
  } catch (error) {
    throw new Error(`Slider silinirken bir hata oluştu: ${error.message}`);
  }
};

// İd'ye göre slider güncelleme fonksiyonu
export const updateSliderById = async (id, data) => {
  await checkAdmin();
  try {
    await db.slider.update({
      where: { id },
      data,
    });
  } catch (error) {
    throw new Error(`Slider güncellenirken bir hata oluştu: ${error.message}`);
  }
};
