import { z } from 'zod';
import { FastifyRequest, FastifyReply } from 'fastify';
import { makeValidateCheckInUseCase } from '@/use-cases/factories/make-validate-check-inuse-case';

export async function validate(request:FastifyRequest, reply: FastifyReply) {
	const validateCheckInsParamsSchema = z.object({
		checkInId: z.string().uuid(),
	});

	const { checkInId } = validateCheckInsParamsSchema.parse(request.params);

	const validateCheckInsUseCase = makeValidateCheckInUseCase();

	await validateCheckInsUseCase.handle({
		checkInId,
	});
	
	return reply.status(204).send();
}