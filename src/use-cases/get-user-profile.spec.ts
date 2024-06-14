import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { hash } from 'bcryptjs';
import { GetUserProfileUseCase } from './get-user-profile';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

let usersRepository: InMemoryUsersRepository;
let sut: GetUserProfileUseCase;

describe('Get User Profile Use Case', () => {
	beforeEach(() => {
		usersRepository = new InMemoryUsersRepository();
		sut = new GetUserProfileUseCase(usersRepository);
	});

	it('Should be possible to get user profile', async() => {
		const createdUser = await usersRepository.create({
			name: 'hugo',
			email: 'rockerhugo@gmail.com',
			password_hash: await hash('123456', 6),
		});

		const { user } = await sut.handle({
			userId: createdUser.id,
		});

		expect(user.id).toEqual(expect.any(String));
		expect(user.name).toEqual('hugo');
	});

	it('Should unable to authenticate with wrong email', async() => {
		await expect(() => 
			sut.handle({
				userId: 'non-existing-id',
			}),
		).rejects.toBeInstanceOf(ResourceNotFoundError);
	});
});