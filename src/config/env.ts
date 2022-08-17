import { config } from "dotenv";

config({ path: "src/.env" });

const URL_BASE: string = process.env.URL_BASE;
const GRANT_TYPE: string = process.env.GRANT_TYPE;
const APP_KEY: string = process.env.APP_KEY;
const APP_SECRET: string = process.env.APP_SECRET;
const DATABASE: string = process.env.DATABASE;
const HOST: string = process.env.HOST;
const DB_PORT: number = Number(process.env.DB_PORT);
const _USERNAME: string = process.env._USERNAME;
const PASSWORD: string = process.env.PASSWORD;
const ENV: string = process.env.ENV;

export { URL_BASE, GRANT_TYPE, APP_KEY, APP_SECRET, DATABASE, HOST, DB_PORT, _USERNAME, PASSWORD, ENV };
