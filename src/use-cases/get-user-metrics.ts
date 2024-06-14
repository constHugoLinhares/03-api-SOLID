import { CheckInsRepository } from '@/repositories/check-ins-repository';

type GetUserMetricsUseCaseRequest = {
    userID: string;
}

type GetUserMetricsUseCaseResponse = {
	checkInsCount: number
}

export class GetUserMetricsUseCase {
	constructor(private checkInsRepository: CheckInsRepository) {}

	async handle({ 
		userID,
	}: GetUserMetricsUseCaseRequest): Promise<GetUserMetricsUseCaseResponse> {
		const checkInsCount = await this.checkInsRepository.countByUserId(userID);

		return {
			checkInsCount,
		};
	}
}
