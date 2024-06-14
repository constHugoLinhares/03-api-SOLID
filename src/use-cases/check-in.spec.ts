import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository';
import { CheckInUseCase } from './check-in';
import { GymsRepository } from '@/repositories/gyms-repository';
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';
import { Decimal } from '@prisma/client/runtime/library';
import { MaxNumberOfCheckInsError } from './errors/max-number-of-check-ins-error';
import { MaxDistanceError } from './errors/max-distance-error';

let checkInsRepository: InMemoryCheckInsRepository;
let gymsRepository: GymsRepository;
let sut: CheckInUseCase;

describe('Check in Use Case', () => {
	beforeEach(async () => { 
		checkInsRepository = new InMemoryCheckInsRepository();
		gymsRepository = new InMemoryGymsRepository();
		sut = new CheckInUseCase(checkInsRepository, gymsRepository);

		await gymsRepository.create({
			id: 'gym-01',
			title: 'JavaScript Gym',
			description: '',
			phone: '',
			latitude: -22.838094,
			longitude: -47.924737,
		});

		vi.useFakeTimers();
	});

	afterEach(() => { 
		vi.useRealTimers();
	});

	it('Should be possible to check in', async() => {
		const { checkIn } = await sut.handle({
			gymID: 'gym-01',
			userID: 'user-01',
			userLatitude: -22.838094,
			userLongitude: -47.924737,
		});

		expect(checkIn.id).toEqual(expect.any(String));
	});
	
	it('Should not be able possible to check-in twice in the same day', async() => {
		vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

		await sut.handle({
			gymID: 'gym-01',
			userID: 'user-01',
			userLatitude: -22.838094,
			userLongitude: -47.924737,
		});

		await expect(() => 
			sut.handle({
				gymID: 'gym-01',
				userID: 'user-01',
				userLatitude: -22.838094,
				userLongitude: -47.924737,
			})).rejects.toBeInstanceOf(MaxNumberOfCheckInsError);
	});

	it('Should not be able possible to check-in twice but in different days', async() => {
		vi.setSystemTime(new Date(
			2022, 0, 20, 8, 0, 0,
		));
		
		await sut.handle({
			gymID: 'gym-01',
			userID: 'user-01',
			userLatitude: -22.838094,
			userLongitude: -47.924737,
		});

		vi.setSystemTime(new Date(
			2022, 0, 21, 8, 0, 0,
		));

		const { checkIn } = await sut.handle({
			gymID: 'gym-01',
			userID: 'user-01',
			userLatitude: -22.838094,
			userLongitude: -47.924737,
		});

		expect(checkIn.id).toEqual(expect.any(String));
	});

	it('Should not be able to check-in on distant gyms', async () => {
		gymsRepository.items.push({
			id: 'gym-02',
			title: 'JavaScript Gym',
			description: '',
			phone: '',
			latitude: new Decimal(-22.8328134),
			longitude: new Decimal(-47.9288782),
		});

		await expect(
			sut.handle({
				gymID: 'gym-02',
				userID: 'user-01',
				userLatitude: -22.838094,
				userLongitude: -47.924737,
			}),
		).rejects.toBeInstanceOf(MaxDistanceError);
		
	});
});