import { PrismaClient, Prisma } from '../prisma/client/client';
const database = new PrismaClient();

export { Prisma };
export default database;
