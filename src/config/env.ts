import { config } from "dotenv";

config({ path: "src/.env" });

const GRANT_TYPE = process.env.GRANT_TYPE;
const APPKEY = process.env.APPKEY;
const APPSECRET = process.env.APPSECRET;

export { GRANT_TYPE, APPKEY, APPSECRET };
