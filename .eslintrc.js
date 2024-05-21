module.exports = {
    env: {
        commonjs: true,
        es6: true,
        node: true,
        jest: true,
    },
    extends: ['plugin:@typescript-eslint/recommended', 'eslint:recommended'],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
        BigInt: 'readonly',
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2020,
    },
    plugins: [
        'prettier',
        'better-mutation',
        'prefer-arrow-functions',
        'autofix',
        '@typescript-eslint',
        "unused-imports",
    ],
    overrides: [
        {
            files: [
                '**/*.test.js',
                '**/*.test.jsx',
                '**/*.test.ts',
                '**/*.test.tsx',
                '**/test/**/*.js',
                '**/test/**/*.ts',
                '**/tests/**/*.js',
                '**/tests/**/*.ts',
            ],
            env: {
                jest: true,
            },
            rules: {
                'better-mutation/no-mutating-functions': 'off',
                'better-mutation/no-mutating-methods': 'off',
                'better-mutation/no-mutation': 'off',
                'max-nested-callbacks': ['error', 8],
            },
        },
    ],
    rules: {
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/no-empty-interface': 'off',
        'no-unused-vars': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        'no-undef': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
    }
};
