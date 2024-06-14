import { CreateGymUseCase } from '../create-gym';
import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository';

export const makeCreateGymUseCase = () => {
	const gymsRepository = new PrismaGymsRepository();
	const createGymUseCase = new CreateGymUseCase(gymsRepository);

	return createGymUseCase;
};