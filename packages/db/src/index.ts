import { PrismaClient, AdminType as PrismaAdminTypeStr } from "@prisma/client";
import {config} from "dotenv";
config();

const prismaClientSingleton = () => {
    return new PrismaClient()
  }
  
  declare global {
    var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>
  }
  
  const prisma: ReturnType<typeof prismaClientSingleton> = globalThis.prismaGlobal ?? prismaClientSingleton()
  
  export const client =  prisma;
  export const AdminType = PrismaAdminTypeStr;
  
  if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma