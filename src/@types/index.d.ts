declare global {
    namespace NodeJS {
        interface ProcessEnv {
            URL_BASE: string;
            GRANT_TYPE: string;
            APP_KEY: string;
            APP_SECRET: string;
        }
    }
}

export {};
