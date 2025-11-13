import { Router } from "express";
import {
  initiateDonationHandler,
  verifyDonationHandler
} from "../controllers/donation.controller";

const router = Router();

router.post("/initiate", initiateDonationHandler);
router.post("/verify", verifyDonationHandler);

export default router;

