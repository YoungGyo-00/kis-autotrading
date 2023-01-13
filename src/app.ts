import express, { Application, NextFunction, Request, Response } from "express";

import { PORT } from "@env";
import { Schedular } from "components/schedular";

class App {
    public app: Application;

    constructor() {
        this.app = express();

        this.setMiddleWare();
        this.setStatic();
        this.schedular();
        this.errorHandler();
    }

    setMiddleWare() {
        this.app.set("port", PORT || 8080);

        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
    }

    setStatic() {}

    getRouter() {}

    schedular() {
        new Schedular();
    }

    errorHandler() {
        this.app.use((req: Request, res: Response, next: NextFunction) => {
            const err: any = new Error(`${req.method} ${req.url} 라우터가 없습니다`);
            err.status = 404;
            next(err);
        });

        this.app.use((err: any, req: Request, res: Response, next: NextFunction) => {
            res.locals.message = err.message;
            res.locals.error = process.env.NODE_ENV !== "production" ? err : {};
            res.status(err.status || 500);

            console.error(err);
            res.status(err.status).json({
                success: err.success,
                message: err.message,
            });
        });
    }
}

export default new App().app;
