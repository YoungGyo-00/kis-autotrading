import { SnakeNamingStrategy } from "typeorm-naming-strategies";

import { DB_PORT, HOST, _USERNAME, PASSWORD, DATABASE } from "../env";

const configs: Signature = {
    development: {
        type: "mysql",
        host: HOST,
        port: DB_PORT,
        username: _USERNAME,
        password: PASSWORD,
        database: DATABASE,
        timezone: "Z",
        namingStrategy: new SnakeNamingStrategy(),
        synchronize: true,
        logging: true,
        dropSchema: false,
        entities: [],
    },
};

export { configs };
