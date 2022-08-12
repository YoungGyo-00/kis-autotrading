import { config } from "dotenv";

config({ path: "src/.env" });

const URL_BASE: string = process.env.URL_BASE;
const GRANT_TYPE: string = process.env.GRANT_TYPE;
const APP_KEY: string = process.env.APP_KEY;
const APP_SECRET: string = process.env.APP_SECRET;

export { URL_BASE, GRANT_TYPE, APP_KEY, APP_SECRET };
