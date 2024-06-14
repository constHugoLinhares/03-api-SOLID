import { UsersRepository } from '@/repositories/users-repository';
import { InvalidCredentialsError } from './errors/invalid-credentials-error';
import { compare } from 'bcryptjs';

type AuthenticateUseCaseRequest = {
    email: string;
    password: string;
}

type AuthenticateUseCaseResponse = {
	user: {
		id: string;
		name: string;
		email: string;
		password_hash: string;
		role?: string;
	}
}

export class AuthenticateUseCase {
	constructor(private usersRepository: UsersRepository) {}

	async handle({ 
		email, 
		password, 
	}: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
		const user = await this.usersRepository.findByEmail(email);

		if (!user) throw new InvalidCredentialsError();

		const doesPasswordMatches = await compare(password, user.password_hash);

		if (!doesPasswordMatches) throw new InvalidCredentialsError();

		return { user };
	}
}
