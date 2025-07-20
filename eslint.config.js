import naverpay from '@naverpay/eslint-config'

export default [
    {
        ignores: ['**/dist/**'],
    },
    ...naverpay.configs.react,
    ...naverpay.configs.strict,
    ...naverpay.configs.packageJson,
]
