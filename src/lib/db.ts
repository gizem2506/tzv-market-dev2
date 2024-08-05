import { PrismaClient } from "@prisma/client";

/* const prisma = new PrismaClient();

const globalForPrisma = global as unknown as { prisma: PrismaClient };

const db = globalForPrisma.prisma || prisma;

if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;
}

export default db; */

declare global {
  var prisma: PrismaClient | undefined;
}

export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalThis.prisma = db;
