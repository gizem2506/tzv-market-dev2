"use server";

import bcrypt from 'bcryptjs';
import { getUserById, getUserByMail } from "@/data/user";
import { currentUser } from "@/lib/current-user";
import { db } from "@/lib/db";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/tokens";
import { SettingsSchema } from "@/schemas";
import { unstable_update } from "@/auth";

export const settings = async (values) => {
  const parsedValues = SettingsSchema.parse(values);
  const user = await currentUser();
  if (!user) return { error: "Unauthorized!" };

  const dbUser = await getUserById(user.id);
  if (!dbUser) return { error: "Unauthorized!" };

  if (user.isOAuth) {
    parsedValues.email = undefined;
    parsedValues.password = undefined;
    parsedValues.newPassword = undefined;
    parsedValues.isTwoFactorEnabled = undefined;
  }

  if (parsedValues.email && parsedValues.email !== user.email) {
    const existingUser = await getUserByMail(parsedValues.email);
    if (existingUser && existingUser.id !== user.id) {
      return { error: "E-posta zaten kullanımda!" };
    }
    const verificationToken = await generateVerificationToken(parsedValues.email);
    await sendVerificationEmail(verificationToken.email, verificationToken.token);
    return { success: "Doğrulama e-postası gönderildi!" };
  }

  if (parsedValues.password && parsedValues.newPassword && dbUser.password) {
    const passwordsMatch = await bcrypt.compare(parsedValues.password, dbUser.password);
    if (!passwordsMatch) return { error: "Yanlış şifre!" };

    const hashedPassword = await bcrypt.hash(parsedValues.newPassword, 10);
    parsedValues.password = hashedPassword;
    parsedValues.newPassword = undefined;
  }

  const updatedUser = await db.user.update({
    where: { id: user.id },
    data: { ...parsedValues }
  });

  unstable_update({
    user: {
      name: updatedUser.name,
      email: updatedUser.email,
      isTwoFactorEnabled: updatedUser.isTwoFactorEnabled,
      role: updatedUser.role
    }
  });
  
  return { success: "Ayarlar güncellendi!" };
};
