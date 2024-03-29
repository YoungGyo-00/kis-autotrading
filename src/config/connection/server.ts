import "reflect-metadata";

import { createConnection } from "typeorm";

import app from "app";
import { connectionOptions } from "database/ormconfig";

createConnection(connectionOptions)
    .then(() => {
        console.log("DB Connection");

        app.listen(app.get("port"), () => {
            console.log(app.get("port") + " 포트 연결 성공");
        });
    })
    .catch(err => {
        console.error(err);
    });
