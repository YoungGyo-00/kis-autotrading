import { config } from "dotenv";

config({ path: "src/.env" });

const BASE_URL: string = process.env.BASE_URL;
const APP_KEY: string = process.env.APP_KEY;
const APP_SECRET: string = process.env.APP_SECRET;
const DATABASE: string = process.env.DATABASE;
const HOST: string = process.env.HOST;
const DB_PORT: number = Number(process.env.DB_PORT);
const _USERNAME: string = process.env._USERNAME;
const PASSWORD: string = process.env.PASSWORD;
const ENV: string = process.env.ENV;
const PORT: number = Number(process.env.PORT);
const CANO: string = process.env.CANO;
const ACNT_PRDT_CD: string = process.env.ACNT_PRDT_CD;

export { BASE_URL, APP_KEY, APP_SECRET, DATABASE, HOST, DB_PORT, _USERNAME, PASSWORD, ENV, PORT, CANO, ACNT_PRDT_CD };
