import { PrismaClient } from '@prisma/client';
import { env } from '@/ENV';

export const prisma = new PrismaClient({
	log: env.NODE_ENV === 'dev' ? ['query'] : [],
});