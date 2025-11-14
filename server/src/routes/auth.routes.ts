import { Router } from "express";
import { adminLogin, getAdminProfile } from "../controllers/auth.controller";
import { authenticate } from "../middleware/auth";

const router = Router();

router.post("/login", adminLogin);
router.get("/me", authenticate, getAdminProfile);

export default router;

