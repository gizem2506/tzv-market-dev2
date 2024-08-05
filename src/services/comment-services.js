"use server";

import { currentRole } from "../lib/current-user";
import { db } from "../lib/db";

// Kullanıcının admin olup olmadığını kontrol eden fonksiyon
const checkAdmin = async () => {
  const role = await currentRole();
  if (role !== "ADMIN") {
    throw new Error(
      "Bu işlem sadece admin kullanıcılar tarafından yapılabilir."
    );
  }
};
// Yorum ekleme fonksiyonu
export const addComment = async (comment) => {
  const addedComment = await db.comment.create({ data: comment });
  return addedComment;
};

// Tüm yorumları getirme fonksiyonu
export const getAllComments = async () => {
  const comments = await db.comment.findMany();
  return comments;
};

// İd'ye göre yorum silme fonksiyonu
export const deleteCommentById = async (id) => {
  await checkAdmin();
  try {
    await db.comment.delete({
      where: { id },
    });
  } catch (error) {
    throw new Error(`Yorum silinirken bir hata oluştu: ${error.message}`);
  }
};
// İd'ye göre yorum güncelleme fonksiyonu
export const updateCommentById = async (id, data) => {
  await checkAdmin();
  try {
    const updateComment = await db.comment.update({
      where: { id },
      data,
    });
    return updateComment;
  } catch (error) {
    throw new Error(`Yorum güncellenirken bir hata oluştu: ${error.message}`);
  }
};
// Belirli bir ürüne ait yorumları getirme fonksiyonu

export const getCommentsByProductId = async (productId) => {
  if (!productId) return null;
  try {
    const comments = await db.comment.findMany({
      where: { productId },
    });

    return comments;
  } catch (error) {
    throw new Error(`Yorumlar getirilirken bir hata oluştu: ${error.message}`);
  }
};

// Admin panelinde yorumun verify değerini true yapma fonksiyonu
export const verifyCommentById = async (id) => {
  await checkAdmin();
  try {
    const updatedComment = await db.comment.update({
      where: { id },
      data: { verify: true },
    });
    return updatedComment;
  } catch (error) {
    throw new Error(`Yorum onaylanırken bir hata oluştu: ${error.message}`);
  }
};
