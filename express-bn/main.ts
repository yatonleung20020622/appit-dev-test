import express from "express";
import { createRoutes } from "./src/routes/index.js";
import { createApiRoutes } from "./src/routes/api.js";

const port = process.env.PORT || 9453;

const app = express();

// Add CORS headers manually
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Apply root routes
app.use("/", createRoutes());

// Apply API routes
app.use("/api", createApiRoutes());

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
