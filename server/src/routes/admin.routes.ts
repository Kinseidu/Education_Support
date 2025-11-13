import express from "express";
import { adminLogin, getAdminProfile } from "../controllers/admin.controller";
import { protectRoute } from "../middleware/auth.middleware";

const router = express.Router();

router.post("/login", adminLogin);
router.get("/profile", protectRoute, getAdminProfile);

export default router;
