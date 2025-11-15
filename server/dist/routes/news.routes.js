"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const news_controller_1 = require("../controllers/news.controller");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.get("/", news_controller_1.getNews);
router.get("/:slug", news_controller_1.getNewsBySlug);
router.post("/", auth_1.authenticate, auth_1.authorizeAdmin, news_controller_1.createNews);
router.put("/:id", auth_1.authenticate, auth_1.authorizeAdmin, news_controller_1.updateNews);
router.delete("/:id", auth_1.authenticate, auth_1.authorizeAdmin, news_controller_1.deleteNews);
exports.default = router;
//# sourceMappingURL=news.routes.js.map