"use server";

import { db } from "../lib/db";

// Yeni kullanıcı ekleme fonksiyonu
export const addUser = async (user) => {
  try {
    const addedUser = await db.user.create({ data: user });
    return addedUser;
  } catch (error) {
    throw new Error(`Kullanıcı eklenirken bir hata oluştu: ${error.message}`);
  }
};

// Tüm kullanıcıları getirme fonksiyonu
export const getAllUsers = async () => {
  try {
    const users = await db.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        created_date: true, 
      },
    });
    return users;
  } catch (error) {
    throw new Error(`Kullanıcılar getirilirken bir hata oluştu: ${error.message}`);
  }
};

// İd'ye göre kullanıcıyı getirme fonksiyonu
export const getUserById = async (id) => {
  try {
    const user = await db.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        created_date: true, 
         password: false 
      },
    });
    return user;
  } catch (error) {
    throw new Error(`Kullanıcı getirilirken bir hata oluştu: ${error.message}`);
  }
};

// İd'ye göre kullanıcıyı silme fonksiyonu
export const deleteUserById = async (id) => {
  try {
    await db.user.delete({
      where: { id },
    });
  } catch (error) {
    throw new Error(`Kullanıcı silinirken bir hata oluştu: ${error.message}`);
  }
};

// İd'ye göre kullanıcıyı güncelleme fonksiyonu
export const updateUserById = async (id, data) => {
  try {
    await db.user.update({
      where: { id },
      data,
    });
  } catch (error) {
    throw new Error(`Kullanıcı güncellenirken bir hata oluştu: ${error.message}`);
  }
};
