// eslint.config.mjs
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

import pluginJs from '@eslint/js';
import stylisticTs from '@stylistic/eslint-plugin-ts';
import tsParser from '@typescript-eslint/parser';
import absolutePlugin from 'eslint-plugin-absolute';
import importPlugin from 'eslint-plugin-import';
import promisePlugin from 'eslint-plugin-promise';
import securityPlugin from 'eslint-plugin-security';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [
	{
		ignores: ['dist/**']
	},
	pluginJs.configs.recommended,

	...tseslint.configs.recommended,

	{
		files: ['**/*.{ts,tsx}'],
		languageOptions: {
			globals: globals.browser,
			parser: tsParser,
			parserOptions: {
				createDefaultProgram: true,
				project: './tsconfig.json',
				tsconfigRootDir: __dirname
			}
		}
	},

	{
		files: ['**/*.{ts,tsx}'],
		plugins: { '@stylistic/ts': stylisticTs },
		rules: {
			'@stylistic/ts/padding-line-between-statements': [
				'error',
				{ blankLine: 'always', next: 'return', prev: '*' }
			]
		}
	},

	{
		files: ['**/*.{js,mjs,cjs,json,ts,tsx,jsx}'],
		plugins: {
			absolute: absolutePlugin,
			import: importPlugin,
			promise: promisePlugin,
			security: securityPlugin
		},
		rules: {
			'absolute/explicit-object-types': 'error',
			'absolute/localize-react-props': 'error',
			'absolute/max-depth-extended': ['error', 1],
			'absolute/max-jsxnesting': ['error', 5],
			'absolute/min-var-length': [
				'error',
				{ allowedVars: ['_', 'id', 'db', 'OK'], minLength: 3 }
			],
			'absolute/no-button-navigation': 'error',
			'absolute/no-explicit-return-type': 'error',
			'absolute/no-inline-prop-types': 'error',
			'absolute/no-multi-style-objects': 'error',
			'absolute/no-nested-jsx-return': 'error',
			'absolute/no-or-none-component': 'error',
			'absolute/no-transition-cssproperties': 'error',
			'absolute/no-type-cast': 'error',
			'absolute/no-unnecessary-div': 'error',
			'absolute/no-unnecessary-key': 'error',
			'absolute/no-useless-function': 'error',
			'absolute/seperate-style-files': 'error',
			'absolute/sort-exports': [
				'error',
				{
					caseSensitive: true,
					natural: true,
					order: 'asc',
					variablesBeforeFunctions: true
				}
			],
			'absolute/sort-keys-fixable': [
				'error',
				{
					caseSensitive: true,
					natural: true,
					order: 'asc',
					variablesBeforeFunctions: true
				}
			],
			'arrow-body-style': ['error', 'as-needed'],
			'consistent-return': 'error',
			eqeqeq: 'error',
			'func-style': [
				'error',
				'expression',
				{ allowArrowFunctions: true }
			],
			'import/no-cycle': 'error',
			'import/no-default-export': 'error',
			'import/no-relative-packages': 'error',
			'import/no-unused-modules': ['error', { missingExports: true }],
			'import/order': ['error', { alphabetize: { order: 'asc' } }],
			'no-await-in-loop': 'error',
			'no-console': ['error', { allow: ['warn', 'error'] }],
			'no-debugger': 'error',
			'no-duplicate-case': 'error',
			'no-duplicate-imports': 'error',
			'no-else-return': 'error',
			'no-empty-function': 'error',
			'no-empty-pattern': 'error',
			'no-empty-static-block': 'error',
			'no-fallthrough': 'error',
			'no-floating-decimal': 'error',
			'no-global-assign': 'error',
			'no-implicit-coercion': 'error',
			'no-implicit-globals': 'error',
			'no-loop-func': 'error',
			'no-magic-numbers': [
				'warn',
				{ detectObjects: false, enforceConst: true, ignore: [0, 1] }
			],
			'no-misleading-character-class': 'error',
			'no-nested-ternary': 'error',
			'no-new-native-nonconstructor': 'error',
			'no-new-wrappers': 'error',
			'no-param-reassign': 'error',
			'no-restricted-imports': [
				'error',
				{
					paths: [
						{
							importNames: ['default'],
							message:
								'Import only named React exports for tree-shaking.',
							name: 'react'
						},
						{
							importNames: ['default'],
							message: 'Import only the required Bun exports.',
							name: 'bun'
						}
					]
				}
			],
			'no-return-await': 'error',
			'no-shadow': 'error',
			'no-undef': 'error',
			'no-unneeded-ternary': 'error',
			'no-unreachable': 'error',
			'no-useless-assignment': 'error',
			'no-useless-concat': 'error',
			'no-useless-return': 'error',
			'no-var': 'error',
			'prefer-arrow-callback': 'error',
			'prefer-const': 'error',
			'prefer-destructuring': [
				'error',
				{ array: true, object: true },
				{ enforceForRenamedProperties: false }
			],
			'prefer-template': 'error',
			'promise/always-return': 'warn',
			'promise/avoid-new': 'warn',
			'promise/catch-or-return': 'error',
			'promise/no-callback-in-promise': 'warn',
			'promise/no-nesting': 'warn',
			'promise/no-promise-in-callback': 'warn',
			'promise/no-return-wrap': 'error',
			'promise/param-names': 'error'
		}
	},
	{
		files: [
			'example/server.ts',
			'tsconfig.json',
			'package.json',
			'.prettierrc.json'
		],
		rules: {
			'import/no-unused-modules': 'off'
		}
	},
	{
		files: ['tsconfig.json', 'package.json', '.prettierrc.json'],
		rules: {
			'@typescript-eslint/no-unused-expressions': 'off'
		}
	},
	{
		files: ['example/server.ts'],
		rules: {
			'no-console': 'off'
		}
	},
	{
		files: ['eslint.config.mjs'],
		rules: {
			'no-magic-numbers': 'off'
		}
	},
	{
		files: ['eslint.config.mjs'],
		rules: {
			'import/no-default-export': 'off'
		}
	}
];
