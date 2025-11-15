"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyDonationHandler = exports.initiateDonationHandler = void 0;
const apiResponse_1 = require("../utils/apiResponse");
const donation_validator_1 = require("../validators/donation.validator");
const donation_service_1 = require("../services/donation.service");
const initiateDonationHandler = async (req, res, next) => {
    try {
        const input = (0, donation_validator_1.validateDonationInitiateInput)(req.body);
        const result = await (0, donation_service_1.initiateDonation)(input);
        return (0, apiResponse_1.sendSuccess)(res, result, "Donation initialized successfully.", 201);
    }
    catch (error) {
        return next(error);
    }
};
exports.initiateDonationHandler = initiateDonationHandler;
const verifyDonationHandler = async (req, res, next) => {
    try {
        const input = (0, donation_validator_1.validateDonationVerifyInput)(req.body);
        const result = await (0, donation_service_1.verifyDonation)(input);
        return (0, apiResponse_1.sendSuccess)(res, result, "Donation verification completed.");
    }
    catch (error) {
        return next(error);
    }
};
exports.verifyDonationHandler = verifyDonationHandler;
//# sourceMappingURL=donation.controller.js.map