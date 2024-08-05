"use server"

import bycrypt from 'bcryptjs'
import { z } from "zod"
import { getPasswordResetTokenByToken } from "../data/password-reset-token";
import { getUserByMail } from "../data/user";
import { NewPasswordSchema } from "../schemas"
import { db } from '../lib/db';

export const newPassword = async (values, token) => {
    if (!token) return { error: "Eksik token!" };

    const validatedFields = NewPasswordSchema.safeParse(values);
    if (!validatedFields.success) return { error: "Geçersiz alan!" };

    const { password } = validatedFields.data;

    const existingToken = await getPasswordResetTokenByToken(token);
    if (!existingToken) return { error: "Geçersiz Token!" };

    const hasExpired = new Date(existingToken.expires) < new Date();
    if (hasExpired) return { error: 'Tokenın süresi doldu!' }

    const existingUser = await getUserByMail(existingToken.email);
    if (!existingUser) return { error: 'E-posta mevcut değil!' }

    const hashedPassword = await bycrypt.hash(password, 10)

    await db.user.update({ where: { id: existingUser.id }, data: { password: hashedPassword } })
    await db.passwordResetToken.delete({where:{id:existingToken.id}})

    return { success: "Şifre güncellendi!" }
}