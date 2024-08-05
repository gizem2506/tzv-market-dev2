"use server";

import { currentRole } from "@/lib/current-user";
import { UserRole } from "@prisma/client";

export const admin = async () => {
  const role = await currentRole();
  if (role !== UserRole.ADMIN) return { error: "Yetkisiz sunucu eylemi!" };
  return { success: "Sunucu eylemine izin verildi!" };
};
