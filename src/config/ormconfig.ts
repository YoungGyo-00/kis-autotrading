import { ConnectionOptions } from "typeorm";

import { configs } from "./db";
import { ENV } from "./env";

const connectionOptions: ConnectionOptions = configs[ENV];

export { connectionOptions };
