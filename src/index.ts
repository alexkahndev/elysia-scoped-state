import { Elysia } from 'elysia';
import { Prettify } from 'elysia/types';
import { ScopedRecord, ScopedStateConfig, ValueOnly } from './types';

export const scopedState = <
	Setup extends Record<string, ScopedStateConfig<unknown>>
>(
	setup: Setup
) => {
	const initialState = Object.fromEntries(
		Object.entries(setup).map(([key, entry]) => [key, entry.value])
	);

	const initialRecord: ScopedRecord<Prettify<ValueOnly<Setup>>> = {};

	return new Elysia({ name: 'scoped-state' })
		.state({ scoped: initialRecord })
		.derive(
			({ store: { scoped }, cookie: { user_session_id }, status }) => {
				if (user_session_id === undefined) {
					return status('Bad Request', 'Cookies not set properly');
				}

				// The user session doesnt exist yet, so we create it
				if (user_session_id.value === undefined) {
					user_session_id.value = crypto.randomUUID();
					// @ts-expect-error - Object.entries loses type inference because of the `unknown` type
					scoped[user_session_id.value] = initialState;
				}

				// The server got reset but the user session cookie still exists, so we reset the scoped state
				if (scoped[user_session_id.value] === undefined) {
					// @ts-expect-error - Object.entries loses type inference because of the `unknown` type
					scoped[user_session_id.value] = initialState;
				}

				const scopedStore = scoped[user_session_id.value];

				if (scopedStore === undefined)
					return status(
						'Internal Server Error',
						'Scoped store not found'
					);

				return {
					scopedStore,
					resetScopedStore: (ignorePreserve?: boolean) => {
						for (const key in setup) {
							const entry = setup[key];
							if (entry === undefined) {
								throw new Error(
									`Scoped setup is missing for key "${key}".`
								);
							}
							if (!ignorePreserve && entry.preserve) continue;
							scopedStore[key] = entry.value;
						}
					}
				};
			}
		)
		.as('global');
};
