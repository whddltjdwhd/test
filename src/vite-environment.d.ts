interface ImportMetaEnv {
    readonly VITE_ENV: string
    readonly VITE_DEVELOPMENT_BASE_URL: string
    readonly VITE_PRODUCTION_BASE_URL: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
