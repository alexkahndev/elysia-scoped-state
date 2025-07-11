# elysia-scoped-state

## Elysia Scoped State is a plugin that provides per-user-session server-side state management in Elysia, letting you store and retrieve data tied to individual users. It’s especially useful for powering stateful HTMX interactions, but can be used for any server-side data you need to persist across requests.

## Installation

```bash
# Bun
bun add elysia-scoped-state

# npm
npm install elysia-scoped-state

# pnpm
pnpm add elysia-scoped-state

# Yarn
yarn add elysia-scoped-state
```

---

## Key Features

- **Per-user scoped store**  
  Each request is mapped to its own slice of the shared `.state.scoped` object, keyed by a secure `user_session_id` cookie set automatically on first visit.

---

## API

| Function / Property                          | Description                                                                                                                |
| -------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `scopedState(setup)`                         | Creates the plugin. `setup` is an object where keys are pieces of state and values are `{ value: T; preserve?: boolean }`. |
| `scopedStore`                                | Derived context property containing the state you defined. Access any value via `scopedStore.<yourKey>`.                   |
| `resetScopedStore(ignorePreserve?: boolean)` | Available in derived context; resets the caller’s store (pass `true` to ignore all `preserve` flags).                      |

---

## Example

```ts
export const server = new Elysia()
	.use(
		scopedState({
			count: { value: 0 },
			userData: { value: {}, preserve: true }
		})
	)
	.get('/', () => Bun.file('./build/pages/example.html'))
	.post('/api/reset', ({ resetScopedStore }) => resetScopedStore())
	.get('/api/count', ({ scopedStore }) => scopedStore.count)
	.post('/api/increment', ({ scopedStore }) => ++scopedStore.count)
	.listen(3000);
```

---

## License

Creative Commons **CC BY-NC 4.0** – see [`LICENSE`](./LICENSE) for details.
