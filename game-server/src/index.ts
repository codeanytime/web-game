/**
 * IMPORTANT:
 * ---------
 * Do not manually edit this file if you'd like to host your server on Colyseus Cloud
 *
 * If you're self-hosting (without Colyseus Cloud), you can manually
 * instantiate a Colyseus Server as documented here:
 *
 * See: https://docs.colyseus.io/server/api/#constructor-options
 */
import { listen } from "@colyseus/tools";

// Import Colyseus config
import UserController from "./api/controllers/user-controller";
import App from "./app";

const port = process.env.PORT || 3000;
// const config = require("app.config");

const app = new App([new UserController()], 2567);
// Create and listen on 2567 (or PORT environment variable.)
// listen(app);

app.listen()
