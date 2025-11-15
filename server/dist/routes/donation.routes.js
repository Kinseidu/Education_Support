"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const donation_controller_1 = require("../controllers/donation.controller");
const router = (0, express_1.Router)();
router.post("/initiate", donation_controller_1.initiateDonationHandler);
router.post("/verify", donation_controller_1.verifyDonationHandler);
exports.default = router;
//# sourceMappingURL=donation.routes.js.map