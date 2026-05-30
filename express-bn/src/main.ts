import express from "express";
import { createRoutes } from "./routes/index.js";
import { createApiRoutes } from "./routes/api.js";

const port = process.env.PORT || 9453;

class Server {
  private app = express();

  constructor() {
    this.setupRoutes();
  }

  private setupRoutes() {
    // Apply weather routes
    this.app.use("/", createRoutes());
    // Apply API routes
    this.app.use("/api", createApiRoutes());
  }

  start() {
    this.app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  }
}

const server = new Server();

server.start();
