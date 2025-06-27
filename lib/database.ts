import { PrismaClient, Prisma as PrismaType } from '../prisma/client/client';
const database = new PrismaClient();

export { PrismaType };
export default database;
