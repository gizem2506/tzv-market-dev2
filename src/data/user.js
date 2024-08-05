"use server";

import { db } from "../lib/db";

export const getUserByMail = async (email) => {
  try {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });
    
    return user;
  } catch (error) {
    return null;
  }
};

export const getUserById = async (id) => {
  try {
    const user = await db.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  } catch (error) {
    return null;
  }
};
