import { UsersRepository } from '@/repositories/users-repository';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

type GetUserProfileUseCaseRequest = {
    userId: string,
}

type GetUserProfileUseCaseResponse = {
	user: {
		id: string;
		name: string;
		email: string;
		password_hash: string;
	}
}

export class GetUserProfileUseCase {
	constructor(private usersRepository: UsersRepository) {}

	async handle({ 
		userId,
	}: GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseResponse> {
		const user = await this.usersRepository.findById(userId);

		if (!user) throw new ResourceNotFoundError();

		return { user };
	}
}
