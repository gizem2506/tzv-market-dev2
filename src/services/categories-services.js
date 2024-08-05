"use server";

import { db } from "../lib/db";

import slugify from "slugify";

// Kategori ekleme fonksiyonu
export const addCategory = async (category) => {
  // Kategori adından slug oluşturma
  const categorySlug = slugify(category.categoryName, { lower: true });

  try {
    // Kategori veritabanına ekleme
    const addedCategory = await db.category.create({
      data: {
        ...category,
        categorySlug: categorySlug,
      },
    });

    return { success: `${addedCategory.categoryName} başarıyla eklendi.` };
  } catch (error) {
    console.error("Error adding category:", error);
    return { success: false, message: "Kategori eklenirken bir hata oluştu." };
  }
};

// Tüm onaylı kategorileri getirme fonksiyonu
export const getAllCategories = async () => {
  const categories = await db.category.findMany();
  return categories;
};


// Slug ile kategori getirme fonksiyonu
export const getCategoryBySlug = async (categorySlug) => {
  const category = await db.category.findMany({ where: { categorySlug } });
  return category;
};

// İd'ye göre kategori silme fonksiyonu
export const deleteCategoryById = async (id) => {
  try {
    // İlgili ProductImage kayıtlarını sil
    const products = await db.product.findMany({ where: { categories: { some: { id } } } });
    for (const product of products) {
      await db.productImage.deleteMany({ where: { productId: product.id } });
    }

    // İlgili Product kayıtlarını sil
    await db.product.deleteMany({ where: { categories: { some: { id } } } });

    // Kategori kaydını sil
    await db.category.delete({ where: { id } });

  } catch (error) {
    throw new Error(`Kategori silinirken bir hata oluştu: ${error.message}`);
  }
};

// İd'ye göre Kategori güncelleme fonksiyonu
export const updateCategoryById = async (id, data) => {
  try {
    await db.category.update({
      where: { id },
      data,
    });
  } catch (error) {
    throw new Error(
      `Kategori güncellenirken bir hata oluştu: ${error.message}`
    );
  }
};
// Admin panelinde categorini verify değerini true yapma fonksiyonu
export const verifyCategoriesById = async (id) => {
  try {
    const updatedCategories = await db.category.update({
      where: { id },
      data: { verify: true },
    });
    return updatedCategories;
  } catch (error) {
    throw new Error(`Yorum onaylanırken bir hata oluştu: ${error.message}`);
  }
};
