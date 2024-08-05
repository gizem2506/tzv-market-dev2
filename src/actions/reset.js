"use server";

import { getUserByMail } from "../data/user";
import { sendPasswordResetEmail } from "../lib/mail";
import { generatePasswordResetToken } from "../lib/tokens";
import { ResetSchema } from "../schemas";

export const reset = async (values) => {
    const validatedFields = ResetSchema.safeParse(values);
    if (!validatedFields.success) return { error: "Geçersiz e-posta!" };

    const { email } = validatedFields.data;

    const existingUser = await getUserByMail(email);
    if (!existingUser) return { error: "E-posta bulunamadı!" };

    const resetPasswordToken = await generatePasswordResetToken(existingUser.email);
    await sendPasswordResetEmail(resetPasswordToken.email, resetPasswordToken.token);
    return { success: "Sıfırlama e-postası gönderildi!" };
}
