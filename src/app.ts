import express, { Application } from "express";
import Test from "./api/test";

class App {
    public app: Application;

    constructor() {
        this.app = express();
        this.setMiddleware();
    }

    setMiddleware() {
        this.app.set("port", 8080);
        Test();
    }
}

export default new App().app;
