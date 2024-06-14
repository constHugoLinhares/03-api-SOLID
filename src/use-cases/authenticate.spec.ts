import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { AuthenticateUseCase } from './authenticate';
import { hash } from 'bcryptjs';
import { InvalidCredentialsError } from './errors/invalid-credentials-error';

let usersRepository: InMemoryUsersRepository;
let sut: AuthenticateUseCase;

describe('Authenticate Use Case', () => {
	beforeEach(() => {
		usersRepository = new InMemoryUsersRepository();
		sut = new AuthenticateUseCase(usersRepository);
	});

	it('Should be possible to authenticate', async() => {
		await usersRepository.create({
			name: 'hugo',
			email: 'rockerhugo@gmail.com',
			password_hash: await hash('123456', 6),
		});

		const { user } = await sut.handle({
			email: 'rockerhugo@gmail.com',
			password: '123456',
		});

		expect(user.id).toEqual(expect.any(String));
	});

	it('Should unable to authenticate with wrong email', async() => {
		await expect(() => 
			sut.handle({
				email: 'rockerhugo@gmail.com',
				password: '123456',
			}),
		).rejects.toBeInstanceOf(InvalidCredentialsError);
	});

	it('Should unable to authenticate with wrong email', async() => {
		await usersRepository.create({
			name: 'hugo',
			email: 'rockerhugo@gmail.com',
			password_hash: await hash('123456', 6),
		});

		await expect(() => 
			sut.handle({
				email: 'rockerhugo@gmail.com',
				password: '111 111',
			}),
		).rejects.toBeInstanceOf(InvalidCredentialsError);
	});
});