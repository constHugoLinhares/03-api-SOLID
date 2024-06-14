import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest';
import { app } from '@/app';
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user';

describe('Search Gyms (e2e)', () => {
	beforeAll(async () => {
		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

	it('Should be possible to search gyms by title', async () => {
		const { token } = await createAndAuthenticateUser(app, true);
            
		await request(app.server)
			.post('/gyms')
			.set('Authorization', `Bearer ${token}`)
			.send({
				title: 'JavaScript Gym',
				description: 'Some description',
				phone: '12999345566',
				latitude: -22.8328134,
				longitude: -47.9288782,
			});

		await request(app.server)
			.post('/gyms')
			.set('Authorization', `Bearer ${token}`)
			.send({
				title: 'Typescript Gym',
				description: 'Some description',
				phone: '12999345566',
				latitude: -22.8328134,
				longitude: -47.9288782,
			});

		const response = await request(app.server)
			.get('/gyms/search')
			.query({
				q: 'JavaScript',
			})
			.set('Authorization', `Bearer ${token}`)
			.send();

		expect(response.statusCode).toEqual(200);
		expect(response.body.gyms).toHaveLength(1);
		expect(response.body.gyms).toEqual([
			expect.objectContaining({ title: 'JavaScript Gym' }),
		]);
	});
});
