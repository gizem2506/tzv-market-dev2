import { v4 as uuidv4 } from 'uuid';
import crypto from 'crypto';
import { getVerificationTokenByEmail } from '../data/verification-token';
import { db } from '../lib/db';
import { getPasswordResetTokenByEmail } from '../data/password-reset-token';
import { getTwoFactorTokenByEmail } from '../data/two-factor-token';

export const generatePasswordResetToken = async (email) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 5 * 60 * 1000);
  const existingToken = await getPasswordResetTokenByEmail(email);

  if (existingToken) await db.passwordResetToken.delete({ where: { id: existingToken.id } });

  const passwordResetToken = await db.passwordResetToken.create({ data: { token, expires, email } });
  return passwordResetToken;
}

export const generateVerificationToken = async (email) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 5 * 60 * 1000);
  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await db.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const verificationToken = await db.verificationToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return verificationToken;
};

export const generateTwoFactorToken = async (email) => {
  const token = crypto.randomInt(100000, 1000000).toString();
  const expires = new Date(new Date().getTime() + 5 * 60 * 1000);

  const existingToken = await getTwoFactorTokenByEmail(email);
  if (existingToken) await db.twoFactorToken.delete({ where: { id: existingToken.id } });

  const twoFactorToken = await db.twoFactorToken.create({ data: { email, token, expires } });
  return twoFactorToken;
}
