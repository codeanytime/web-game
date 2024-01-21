import express from "express";
import errorMiddleware from "./middlewares/error.middleware";
import {BaseController} from "./base/base-controller";
import {Server} from "colyseus";
import {MyRoom} from "./rooms/MyRoom";
import {monitor} from "@colyseus/monitor";
import {ConfigOptions} from "@colyseus/tools";

class App {
    public app: express.Application;
    public port: number | string;
    public config = require("./app.config");

    constructor(controllers: BaseController[], port: number | string) {
        this.app = express();
        this.port = port;

        this.initializeMiddlewares();
        this.initializeControllers(controllers);
        this.initializeErrorHandling();
    }

    private initializeMiddlewares() {
        this.app.use(express.json());
    }

    private initializeErrorHandling() {
        this.app.use(errorMiddleware);
    }

    private initializeControllers(controllers: BaseController[]) {
        this.app.get("/", (request, response) => {
            response.send("Application is running");
        });
        controllers.forEach((controller) => {
            this.app.use("/", controller.router);
        });
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on the port ${this.port}`);
        });
    }


}

export default App;