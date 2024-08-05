"use server";
import bcrypt from "bcryptjs";
import { db } from "../lib/db";
import { RegisterSchema } from "../schemas";
import { getUserByMail } from "../data/user";
import { generateVerificationToken } from "../lib/tokens";
import { sendVerificationEmail, sendVerificationEmailCargo } from "../lib/mail";

export const register = async (values) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) return { error: "Geçersiz alan!" };

  const { name, email, password } = validatedFields.data;

  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByMail(email);
  if (existingUser) return { error: "E-posta zaten kullanımda!" };

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  const verificationToken = await generateVerificationToken(email);
  await sendVerificationEmail(verificationToken.email, verificationToken.token);
  return { success: "Onay e-postası gönderildi!" };
};


export const sendVerificationEmailToUser = async (email) => {
  try {
    const verificationToken = await generateVerificationToken(email);
    await sendVerificationEmailCargo(verificationToken.email, verificationToken.token);
    return { success: "Onay e-postası gönderildi!" };
  } catch (error) {
    console.error("E-posta gönderim hatası:", error);
    return { error: "E-posta gönderilemedi!" };
  }
};