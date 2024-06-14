import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';
import { CreateGymUseCase } from './create-gym';

let gymsRepository: InMemoryGymsRepository;
let sut: CreateGymUseCase;

describe('Create Gym Use Case', () => {
	beforeEach(() => { 
		gymsRepository = new InMemoryGymsRepository();
		sut = new CreateGymUseCase(gymsRepository);
	});

	it('Should be possible to create a Gym', async() => {
		const { gym } = await sut.handle({
			title: 'JavaScript Gym',
			description: null,
			phone: null,
			latitude: -22.8328134,
			longitude: -47.9288782,
		});

		expect(gym.id).toEqual(expect.any(String));
	});
});