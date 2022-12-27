declare global {
    namespace NodeJS {
        interface ProcessEnv {
            URL_BASE: string;
            GRANT_TYPE: string;
            APP_KEY: string;
            APP_SECRET: string;
            DATABASE: string;
            HOST: string;
            _USERNAME: string;
            PASSWORD: string;
            ENV: string;
        }
    }

    interface Signature {
        [key: string]: any;
    }
}

export {};