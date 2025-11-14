import { Router } from "express";
import {
  createNews,
  deleteNews,
  getNews,
  getNewsBySlug,
  updateNews
} from "../controllers/news.controller";
import { authenticate, authorizeAdmin } from "../middleware/auth";

const router = Router();

router.get("/", getNews);
router.get("/:slug", getNewsBySlug);
router.post("/", authenticate, authorizeAdmin, createNews);
router.put("/:id", authenticate, authorizeAdmin, updateNews);
router.delete("/:id", authenticate, authorizeAdmin, deleteNews);

export default router;

