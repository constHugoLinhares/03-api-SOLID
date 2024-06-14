import { FastifyRequest, FastifyReply } from 'fastify';
import { makeGetUserMetricsUseCase } from '@/use-cases/factories/make-get-user-metrics-use-case';

export async function metrics(request:FastifyRequest, reply: FastifyReply) {
	const fetchUserCheckInsHistoryUseCase = makeGetUserMetricsUseCase();

	const { checkInsCount } = await fetchUserCheckInsHistoryUseCase.handle({
		userID: request.user.sub,
	});
	
	return reply.status(201).send({
		checkInsCount,
	});
}