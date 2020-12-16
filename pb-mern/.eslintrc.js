module.exports = {
    env: {
        jest: true,
        browser: true,
        node: true,
        es6: true,
    },
    parser: 'babel-eslint',
    extends: ['airbnb', 'prettier', 'prettier/react'],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
            modules: true,
        },
        ecmaVersion: 2018,
        sourceType: 'module',
    },
    plugins: ['react', 'prettier', 'cypress'],
    rules: {
        'prettier/prettier': ['error', { endOfLine: 'auto' }],
        'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
        'react/forbid-prop-types': [0, { forbid: ['any'] }],
        'react/prop-types': 0,
        'cypress/no-assigning-return-values': 'error',
        'cypress/no-unnecessary-waiting': 'error',
        'cypress/assertion-before-screenshot': 'warn',
        'cypress/no-force': 'warn',
        'cypress/no-async-tests': 'error',
    },
};
