import express from "express";
import { createRoutes } from "./src/routes/index.js";
import { createApiRoutes } from "./src/routes/api.js";

const port = process.env.PORT || 9453;

const app = express();

// Apply root routes
app.use("/", createRoutes());

// Apply API routes
app.use("/api", createApiRoutes());

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
