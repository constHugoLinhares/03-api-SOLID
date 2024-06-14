
module.exports = {
	'env': {
		'es2021': true,
		'node': true,
	},
	'extends': [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
	],
  
	'parser': '@typescript-eslint/parser',
	'parserOptions': {
		'sourceType': 'module',
		'ecmaVersion': 'latest',
	},
	'plugins': ['@typescript-eslint'],
	'rules': {
		'function-call-argument-newline': ['error', 'consistent'],
		'indent': ['error','tab'],
		'quotes': ['error','single'],
		'semi': ['error','always'],
		'no-undef': 'off',
		'arrow-spacing': ['error', { 'before': true, 'after': true }],
		'promise/always-return': 'off',
		'promise/catch-or-return': 'off',
		'promise/async-await-error-handling': 'off',
		'brace-style': ['error', '1tbs', { 'allowSingleLine': true }],
		'keyword-spacing': ['error', { 'before': true, 'after': true }],
		'space-before-blocks': ['error', 'always'],
		'object-curly-spacing': ['error', 'always'],
		'object-curly-newline': ['error', { 'multiline': true, 'consistent': true }],
		'object-property-newline': ['error', { 'allowAllPropertiesOnSameLine': true }],
		'comma-dangle': ['error', 'always-multiline'],
	},
};
