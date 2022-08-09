import { config } from "dotenv";

config({ path: "src/.env" });

const URL_VTS = process.env.URL_VTS;
const GRANT_TYPE = process.env.GRANT_TYPE;
const APP_KEY = process.env.APP_KEY;
const APP_SECRET = process.env.APP_SECRET;

export { URL_VTS, GRANT_TYPE, APP_KEY, APP_SECRET };
