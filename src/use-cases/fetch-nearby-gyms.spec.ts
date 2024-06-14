import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms';

let gymsRepository: InMemoryGymsRepository;
let sut: FetchNearbyGymsUseCase;

describe('Fetch Nearby Gyms Use Case', () => {
	beforeEach(async () => { 
		gymsRepository = new InMemoryGymsRepository();
		sut = new FetchNearbyGymsUseCase(gymsRepository);
	});

	it('Should be possible fetch nearby gyms', async() => {
		await gymsRepository.create({
			title: 'Near Gym',
			description: null,
			phone: null,
			latitude: -22.8328134,
			longitude: -47.9288782,
		});
        
		await gymsRepository.create({
			title: 'Far Gym',
			description: null,
			phone: null,
			latitude: -22.792693300294406,
			longitude: -47.76442371735295,
		});

		const { gyms } = await sut.handle({
			userLatitude: -22.838094,
			userLongitude: -47.924737,
		});

		expect(gyms).toHaveLength(1);
		expect(gyms).toEqual([
			expect.objectContaining({ title: 'Near Gym' }),
		]);
	});	
});