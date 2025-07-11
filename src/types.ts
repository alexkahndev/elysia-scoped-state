type Prettify<T> = { [K in keyof T]: T[K] } & {};

export type ScopedStateConfig<T> = { value: T; preserve?: boolean };

export type ValueOnly<
	Setup extends Record<string, ScopedStateConfig<unknown>>
> = {
	[K in keyof Setup]: Setup[K]['value'];
};

export type ScopedRecord<Data extends Record<string, unknown>> = Record<
	string,
	Data
>;
