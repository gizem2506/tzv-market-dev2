"use server";
import { generateVerificationToken } from "../lib/tokens";
import {  sendVerificationEmailCargo } from "../lib/mail";

export const sendVerificationEmailToUser = async (email) => {
  try {
    const verificationToken = await generateVerificationToken(email);
    await sendVerificationEmailCargo(verificationToken.email, verificationToken.token);
    return { success: "Sipariş bilgileri e-postası gönderildi!" };
  } catch (error) {
    console.error("E-posta gönderim hatası:", error);
    return { error: "E-posta gönderilemedi!" };
  }
};