import { Elysia, file } from "elysia";
import { scopedState } from "../src";

export const server = new Elysia()
	.use(
		scopedState({
			count: { value: 0,  preserve: true },
		})
	)
	.get('/', () => file('./build/pages/example.html'))
	.post('/api/reset', ({ resetScopedStore }) => resetScopedStore())
	.get('/api/count', ({ scopedStore }) => scopedStore.count)
	.post('/api/increment', ({ scopedStore }) => ++scopedStore.count)
	.listen(3000);