"use server";

import { db } from "@/src/lib/db";
import { uploadFiles } from "@/src/lib/file";

export const addProductImage = async (prodId, images) => {
  // TODO : file control check
  const { success, fileNames } = await uploadFiles(images);
  if (success === false) return false;

  for (let index = 0; index < fileNames.length; index++) {
    const element = fileNames[index];
    await db.productImage.create({
      data: {
        productId: prodId,
        imageName: element,
      },
    });
  }
  // todo notification messages return
  return {success: true, message: "Resim başarıyla eklendi."};
};
