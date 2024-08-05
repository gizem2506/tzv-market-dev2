"use server";

import { LoginSchema } from "../schemas";
import { signIn } from "../../auth";
import {adminRoutes, DEFAULT_LOGIN_REDIRECT } from "../../routes";
import { AuthError } from "next-auth";
import { getUserByMail } from "../data/user";
import {
  generateTwoFactorToken,
  generateVerificationToken,
} from "../lib/tokens";
import { sendTwoFactorTokenEmail, sendVerificationEmail } from "../lib/mail";
import { getTwoFactorTokenByEmail } from "../data/two-factor-token";
import { db } from "../lib/db";
import { getTwoFactorConfirmationByUserId } from "../data/two-factor-confirmation";

export const login = async (values, callbackUrl = null) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) return { error: "Geçersiz alan!" };

  const { email, password, code } = validatedFields.data;

  const existingUser = await getUserByMail(email);

  if (!existingUser || !existingUser.email || !existingUser.password)
    return { error: "E-posta mevcut değil!" };

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(existingUser.email);
    await sendVerificationEmail(verificationToken.email, verificationToken.token);
    return { success: "Onay e-postası gönderildi!" };
  }

  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    if (code) {
      const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);
      if (!twoFactorToken) return { error: "Geçersiz kod!" };

      if (twoFactorToken.token !== code) return { error: "Geçersiz kod!" };

      const hasExpired = new Date(twoFactorToken.expires) < new Date();
      if (hasExpired) return { error: "Kodun süresi doldu!" };

      await db.twoFactorToken.delete({ where: { id: twoFactorToken.id } });

      const existingConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id);
      if (existingConfirmation)
        await db.twoFactorConfirmation.delete({ where: { id: existingConfirmation.id } });

      await db.twoFactorConfirmation.create({ data: { userId: existingUser.id } });
      
    } else {
      const twoFactorToken = await generateTwoFactorToken(existingUser.email);
      await sendTwoFactorTokenEmail(twoFactorToken.email, twoFactorToken.token);
      return { twoFactor: true };
    }
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: existingUser.role === 'ADMIN' ? adminRoutes : callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Geçersiz kimlik bilgileri!" };
        default:
          return { error: "Bir şeyler ters gitti!" };
      }
    }
    throw error;
  }
};
