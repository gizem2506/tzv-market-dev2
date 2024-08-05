"use server";

import { db } from "../lib/db";

// Adres ekleme fonksiyonu
export const addUserAddress = async (addressData) => {
  const addedAddress = await db.userAddress.create({ data: addressData });
  return addedAddress;
};

// Tüm adresleri getirme fonksiyonu
export const getAllUserAddresses = async () => {
  const addresses = await db.userAddress.findMany();
  return addresses;
};

// Id'ye göre adres silme fonksiyonu
export const deleteUserAddressById = async (id) => {
  try {
    await db.userAddress.delete({
      where: { id },
    });
  } catch (error) {
    throw new Error(`Adres silinirken bir hata oluştu: ${error.message}`);
  }
};

// Id'ye göre adres güncelleme fonksiyonu
export const updateUserAddressById = async (id, data) => {
  try {
    await db.userAddress.update({
      where: { id },
      data,
    });
  } catch (error) {
    throw new Error(`Adres güncellenirken bir hata oluştu: ${error.message}`);
  }
};
