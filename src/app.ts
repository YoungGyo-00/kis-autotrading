import express, { Application } from "express";
import schedule, { Job as ScheduleJob } from "node-schedule";

import { Stock } from "./stock/main";

class App {
    public app: Application;
    private stock: Stock;
    private scheduler: ScheduleJob;

    constructor() {
        this.app = express();
        this.app.set("port", 8080);

        this.scheduler = schedule.scheduleJob({ rule: "* * * * * *" }, async () => {
            this.stock = new Stock();
        });
    }
}

export default new App().app;
