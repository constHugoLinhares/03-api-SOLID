import 'dotenv/config';

import { randomUUID } from 'crypto';
import { execSync } from 'child_process';
import { Environment } from 'vitest';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default <Environment>{
	name: 'prisma',
	transformMode: 'ssr',
	async setup() {
		const schema = randomUUID();
		const databaseURL = generateDatabaseURL(schema);

		process.env.DATABASE_URL = databaseURL;

		execSync('npx prisma migrate deploy');

		return {
			async teardown() { 
				await prisma.$executeRawUnsafe(
					`DROP SCHEMA IF EXISTS "${schema}" CASCADE`,
				);

				await prisma.$disconnect();
			},
		};
	},
};

function generateDatabaseURL(schema:string) {
	if (!process.env.DATABASE_URL) {
		throw new Error('DATABASE_URL is not defined');
	}

	const url = new URL(process.env.DATABASE_URL);

	url.searchParams.set('schema', schema);

	return url.toString();
}