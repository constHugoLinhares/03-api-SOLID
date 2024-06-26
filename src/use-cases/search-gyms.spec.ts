import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';
import { SearchGymsUseCase } from './search-gyms';

let gymsRepository: InMemoryGymsRepository;
let sut: SearchGymsUseCase;

describe('Search Gyms Use Case', () => {
	beforeEach(async () => { 
		gymsRepository = new InMemoryGymsRepository();
		sut = new SearchGymsUseCase(gymsRepository);
	});

	it('Should be possible search for gyms', async() => {
		await gymsRepository.create({
			title: 'JavaScript Gym',
			description: null,
			phone: null,
			latitude: -22.8328134,
			longitude: -47.9288782,
		});
        
		await gymsRepository.create({
			title: 'TypeScript Gym',
			description: null,
			phone: null,
			latitude: -22.8328134,
			longitude: -47.9288782,
		});

		const { gyms } = await sut.handle({
			query: 'JavaScript',
			page: 1,
		});

		expect(gyms).toHaveLength(1);
		expect(gyms).toEqual([
			expect.objectContaining({ title: 'JavaScript Gym' }),
		]);
	});

	it('Should be possible fetch paginated gyms search', async() => {
		for (let i = 1; i <= 22; i++) {
			await gymsRepository.create({
				title: `JavaScript Gym-${i}`,
				description: null,
				phone: null,
				latitude: -22.8328134,
				longitude: -47.9288782,
			});
		}

		const { gyms } = await sut.handle({
			query: 'JavaScript',
			page: 2,
		});

		expect(gyms).toHaveLength(2);
		expect(gyms).toEqual([
			expect.objectContaining({ title: 'JavaScript Gym-21' }),
			expect.objectContaining({ title: 'JavaScript Gym-22' }),
		]);
	});
	
});