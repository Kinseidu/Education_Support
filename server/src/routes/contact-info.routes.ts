import { Router } from "express";
import { getContactInfo } from "../controllers/contactInfo.controller";

const router = Router();

router.get("/", getContactInfo);

export default router;
