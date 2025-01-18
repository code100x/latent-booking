import { PrismaClient, AdminType as PrismaAdminTypeStr } from "@prisma/client";

export const client = new PrismaClient();

export const AdminType = PrismaAdminTypeStr;