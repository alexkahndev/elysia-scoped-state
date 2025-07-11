import { Elysia, file } from 'elysia';
import { scopedState } from '../src';

export const server = new Elysia()
	.use(
		scopedState({
			count: { preserve: true, value: 0 }
		})
	)
	.get('/', () => file('./example/example.html'))
	.get('/example.css', () => file('./example/example.css'))
	.get('/assets/ico/favicon.ico', () => file('./example/favicon.ico'))
	.post('/api/reset', ({ resetScopedStore, query: { force } }) => {
		resetScopedStore(
			force !== undefined && force !== 'false' && force !== '0'
		);

		return 0;
	})
	.get('/api/count', ({ scopedStore }) => scopedStore.count)
	.post('/api/increment', ({ scopedStore }) => ++scopedStore.count)
	.listen({ port: 3000 }, () => {
		console.log('Server is running on http://localhost:3000');
	});
