"use server";

import { db } from "../lib/db";
import { v4 as uuidv4 } from "uuid";
import slugify from "slugify";
import { Decimal } from "@prisma/client/runtime/library";
import { currentRole } from "../lib/current-user";

// UUID oluşturma fonksiyonu
const _createUID = () => {
  return `-${uuidv4().split("-")[0]}`;
};

// Admin rolünü kontrol eden fonksiyon
const checkAdmin = async () => {
  const role = await currentRole();
  if (role !== 'ADMIN') {
    throw new Error('Bu işlem sadece admin kullanıcılar tarafından yapılabilir.');
  }
};

// Ürün ekleme fonksiyonu
export const addProduct = async (product) => {
  await checkAdmin();
  try {
    const productNameSlug = slugify(product.product_name, { lower: true }) + _createUID();
    const { categories, ...productData } = product;

    const addedProduct = await db.product.create({
      data: {
        ...productData,
        product_slug: productNameSlug,  
        categories: {
          connect: categories.map((categoryId) => ({ id: categoryId })),
        },
      },
    });

    return { success: true, message: "Ürün başarıyla eklendi.", product: addedProduct };
  } catch (error) {
    console.error("Ürün eklenirken bir hata oluştu:", error);
    return { success: false, message: "Ürün eklenirken bir hata oluştu." };
  }
};

// Tüm ürünleri getirme fonksiyonu
export const getAllProducts = async () => {
  try {
    const products = await db.product.findMany({
      include: {
        product_image: true,
        categories: true,
      },
    });

    const formattedProducts = products.map(product => ({
      ...product,
      price: product.price instanceof Decimal ? product.price.toNumber() : product.price,
      product_kdv: product.product_kdv instanceof Decimal ? product.product_kdv.toNumber() : product.product_kdv,
    }));

    return formattedProducts;
  } catch (error) {
    console.error("Tüm ürünler getirilirken bir hata oluştu:", error);
    throw new Error("Ürünler getirilirken bir hata oluştu.");
  }
};

// Slug ile ürün getirme fonksiyonu
export const getProductBySlug = async (productSlug) => {
  try {
    const product = await db.product.findFirst({
      where: { product_slug: productSlug },
      include: { 
        product_image: true, 
        comments: {
          where: { verify: true }
        }
      }
    });
    return product;
  } catch (error) {
    console.error("Ürün getirilirken bir hata oluştu:", error);
    throw new Error("Ürün getirilirken bir hata oluştu.");
  }
};

// İd'ye göre ürün silme fonksiyonu
export const deleteProductsById = async (id) => {
  await checkAdmin();
  try {
    await db.productImage.deleteMany({ where: { productId: id } });
    await db.product.delete({ where: { id } });
  } catch (error) {
    console.error("Ürün silinirken bir hata oluştu:", error);
    throw new Error(`Ürün silinirken bir hata oluştu: ${error.message}`);
  }
};

// Ürün güncelleme fonksiyonu
export const updateProductById = async (id, data) => {
  await checkAdmin();
  try {
    const updatedProduct = await db.product.update({ where: { id }, data });
    return updatedProduct;
  } catch (error) {
    console.error("Ürün güncellenirken bir hata oluştu:", error);
    throw new Error(`Ürün güncellenirken bir hata oluştu: ${error.message}`);
  }
};

// Belirli bir categorySlug'a göre ürünleri getirme fonksiyonu
export const getProductsByCategorySlug = async (categorySlug) => {
  try {
    const category = await db.category.findFirst({
      where: { categorySlug },
      include: {
        products: {
          include: {
            product_image: true,
            categories: true,
          },
        },
      },
    });

    if (!category) {
      return { success: false, message: "Kategori bulunamadı." };
    }

    return { success: true, products: category.products };
  } catch (error) {
    console.error("Kategoriye göre ürünler getirilirken bir hata oluştu:", error);
    return { success: false, message: "Ürünler getirilirken bir hata oluştu." };
  }
};
