"use server";

import { db } from "../lib/db";

// Kullanıcının admin olup olmadığını kontrol eden fonksiyon
const checkAdmin = (user) => {
  if (user.role !== 'ADMIN') {
    throw new Error('Bu işlem sadece admin kullanıcılar tarafından yapılabilir.');
  }
};

// Ourservices ekleme fonksiyonu
export const addOurServices = async (ourServices, user) => {
  checkAdmin(user);
  const addedOur = await db.ourServices.create({ data: ourServices });
  return addedOur;
};

// Tüm ourservicesleri getirme fonksiyonu
export const getAllOurServices = async () => {
  const ourservices = await db.ourServices.findMany();
  return ourservices;
};

// İd'ye göre ourservices silme fonksiyonu
export const deleteOurServicesById = async (id, user) => {
  checkAdmin(user);
  try {
    await db.ourServices.delete({
      where: { id },
    });
  } catch (error) {
    throw new Error(`Servis silinirken bir hata oluştu: ${error.message}`);
  }
};

// İd'ye göre ourservices güncelleme fonksiyonu
export const updateOurServicesById = async (id, data, user) => {
  checkAdmin(user);
  try {
    await db.ourServices.update({
      where: { id },
      data,
    });
  } catch (error) {
    throw new Error(`Servis güncellenirken bir hata oluştu: ${error.message}`);
  }
};
