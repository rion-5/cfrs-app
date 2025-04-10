//src/lib/server/prisma.ts
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config(); // 👈 이 줄 추가!
const prisma = new PrismaClient();
export default prisma;