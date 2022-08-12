declare global {
    namespace NodeJS {
        interface ProcessEnv {
            APP_KEY: string;
            APP_SECRET: string;
        }
    }
}

export {};
