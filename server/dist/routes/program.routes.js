"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const program_controller_1 = require("../controllers/program.controller");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.get("/", program_controller_1.getPrograms);
router.post("/", auth_1.authenticate, auth_1.authorizeAdmin, program_controller_1.createProgram);
router.put("/:id", auth_1.authenticate, auth_1.authorizeAdmin, program_controller_1.updateProgram);
router.delete("/:id", auth_1.authenticate, auth_1.authorizeAdmin, program_controller_1.deleteProgram);
exports.default = router;
//# sourceMappingURL=program.routes.js.map