import express, { Application } from "express";

import { Stock } from "./stock";

class App {
    public app: Application;
    private stock: Stock;

    constructor() {
        this.app = express();
        this.stock = new Stock();

        this.app.set("port", 8080);
    }
}

export default new App().app;
