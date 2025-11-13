import { Router } from "express";
import {
  createProgram,
  deleteProgram,
  getPrograms,
  updateProgram
} from "../controllers/program.controller";
import { authenticate, authorizeAdmin } from "../middleware/auth";

const router = Router();

router.get("/", getPrograms);
router.post("/", authenticate, authorizeAdmin, createProgram);
router.put("/:id", authenticate, authorizeAdmin, updateProgram);
router.delete("/:id", authenticate, authorizeAdmin, deleteProgram);

export default router;

