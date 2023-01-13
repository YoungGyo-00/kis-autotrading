import { load } from "cheerio";

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            BASE_URL: string;
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

    type CheerioRoot = ReturnType<typeof load>;
    type Cheerio = cheerio.Cheerio;
    type Tag = cheerio.Element;
}

export {};
