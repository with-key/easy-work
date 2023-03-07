import { PrismaClient } from "@prisma/client";

declare global {
  var db: PrismaClient | undefined;
}

const db = global.db || new PrismaClient();
if (process.env.NODE_ENV === "development") global.db = db;

export default db;
