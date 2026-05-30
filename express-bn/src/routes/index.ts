import { Router } from "express";

export const createRoutes = (): Router => {
  const router = Router();
  router.get("/up", (req, res) => res.json({ success: true }));

  return router;
};
