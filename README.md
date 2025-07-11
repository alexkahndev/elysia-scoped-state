# elysia-scoped-state

A minimalist Elysia plugin that gives every visitor an isolated, in-memory state store—perfect for per-session data such as wizards, form progress, feature flags, or any transient context you don’t want shared across users.

---

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

> **Zero peer dependencies.** Just Elysia itself.

---

## Key Features

- **Per-user scoped store**  
  Each request is mapped to its own slice of the shared `.state.scoped` object, keyed by a secure `user_session_id` cookie set automatically on first visit.

- **`resetScopedStore()` helper**  
  Quickly restore a user’s scoped store to its initial values.

- **`preserve` flag**  
  Add `preserve: true` to any key in your `setup` object to keep that value when `resetScopedStore()` runs.  
  Pass `true` to `resetScopedStore(true)` to override preservation and wipe everything.

---

## API

| Function                       | Description                                                                                           |
| ------------------------------ | ----------------------------------------------------------------------------------------------------- |
| `scopedState(setup)`           | Creates the plugin. `setup` is an object whose values are `{ value: T; preserve?: boolean }`.         |
| `resetScopedStore(ignorePreserve?: boolean)` | Available in derived context; resets the caller’s store (pass `true` to ignore all `preserve` flags). |

---

## Example

```ts
// app.ts
// (Add your example usage here)
```

---

## License

Creative Commons **CC BY‑NC 4.0** – see [`LICENSE`](./LICENSE) for details.
