import { CheckIn } from '@prisma/client';
import { CheckInsRepository } from '@/repositories/check-ins-repository';

type FetchUserCheckInsHistoryUseCaseRequest = {
    userID: string;
	page: number;
}

type FetchUserCheckInsHistoryUseCaseResponse = {
	checkIns: CheckIn[]
}

export class FetchUserCheckInsHistoryUseCase {
	constructor(private checkInsRepository: CheckInsRepository) {}

	async handle({ 
		userID,
		page,
	}: FetchUserCheckInsHistoryUseCaseRequest): Promise<FetchUserCheckInsHistoryUseCaseResponse> {
		const checkIns = await this.checkInsRepository.findManyByUserId(userID, page);

		return {
			checkIns,
		};
	}
}
