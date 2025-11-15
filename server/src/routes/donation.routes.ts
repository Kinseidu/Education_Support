import { Router } from "express";

// Donations endpoints removed. Keep a 410 fallback to avoid runtime errors
// if any code still tries to import these routes.
const router = Router();

router.all("/*", (_req, res) => {
  return res.status(410).json({ success: false, message: "Donations have been removed. Use /api/contact-info." });
});

export default router;

