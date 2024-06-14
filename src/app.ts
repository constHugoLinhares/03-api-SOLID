import fastify from 'fastify';
import fastifyCookie from '@fastify/cookie';
import { ZodError } from 'zod';
import { env } from './ENV';
import fastifyJwt from '@fastify/jwt';
import { usersRoutes } from './http/controllers/users/routes';
import { gymsRoutes } from './http/controllers/gyms/routes';
import { checkInsRoutes } from './http/controllers/check-ins/routes';

export const app = fastify();

app.register(fastifyJwt, {
	cookie: {
		cookieName: 'refreshToken',
		signed: false,
	},
	secret: env.JWT_SECRET,
	sign: {
		expiresIn: '10m',
	},
});

app.register(fastifyCookie);

app.register(usersRoutes);
app.register(gymsRoutes);
app.register(checkInsRoutes);

app.setErrorHandler((error, _request, reply) => {
	if (error instanceof ZodError) 
		return reply
			.status(400)
			.send({ message: 'Validation error.', issues: error.format() });

	if (env.NODE_ENV !== 'production') {
		console.error(error);
	} else {
		// TODO: Here we should log to an external tool like DataDog/NewRelic/Sentry
	}
    
	return reply.status(500).send({ message: 'Internal server error.' });
});