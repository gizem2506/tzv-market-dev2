"use server";
import fs from "node:fs/promises";
import { revalidatePath } from "next/cache";
import { v4 as uuidv4 } from "uuid";
import slugify from "slugify";

const _createUID = () => {
  return uuidv4().split("-")[0] + `-`;
};

export async function uploadFile(
  formData: FormData
): Promise<{ success: boolean; fileName: string }> {
  try {
    const file = formData.get("file") as File;
    if (!file) {
      throw new Error("File is missing");
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    // compressImageBuffer

    const fName = _createUID() + slugify(file.name).toLocaleLowerCase();

    await fs.writeFile(`./public/uploads/images/${fName}`, buffer);

    revalidatePath("/");
    return { success: true, fileName: fName };
  } catch (error) {
    console.log("File upload error: ", error);
    return { success: false, fileName: "" };
  }
}

export async function uploadFiles(
  formData: FormData
): Promise<{ success: boolean; fileNames: string[] }> {
  try {
    const files: File[] = [];
    let fileNames: string[] = [];

    formData.forEach((value, key) => {
      if (key === "files" && value instanceof File) {
        files.push(value);
      }
    });

    for (const file of files) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = new Uint8Array(arrayBuffer);

      const fName = _createUID() + slugify(file.name).toLocaleLowerCase();

      await fs.writeFile(`./public/uploads/images/${fName}`, buffer);
      fileNames.push(fName);
    }

    revalidatePath("/");
    return { success: true, fileNames: fileNames };
  } catch (error) {
    console.log("File upload error: ", error);
    return { success: false, fileNames: [] };
  }
}

export async function deleteFile(fileName: string): Promise<boolean> {
  try {
    await fs.unlink(`./public/uploads/images/${fileName}`);
    return true;
  } catch (error) {
    console.log("File deletion error: ", error);
    return false;
  }
}

export async function deleteFiles(fileNames: string[]): Promise<boolean> {
  try {
    for (const fileName of fileNames) {
      await fs.unlink(`./public/uploads/images/${fileName}`);
    }
    return true;
  } catch (error) {
    console.log("Files deletion error: ", error);
    return false;
  }
}
