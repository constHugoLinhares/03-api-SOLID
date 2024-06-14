import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest';
import { app } from '@/app';
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user';

describe('Create Gym (e2e)', () => {
	beforeAll(async () => {
		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

	it('Should be possible to create a gym', async () => {
		const { token } = await createAndAuthenticateUser(app, true);
            
		const response = await request(app.server)
			.post('/gyms')
			.set('Authorization', `Bearer ${token}`)
			.send({
				title: 'JavaScript Gym',
				description: 'Some description.',
				phone: '12999345566',
				latitude: -22.8328134,
				longitude: -47.9288782,
			});

		expect(response.statusCode).toEqual(201);
	});
});
