"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProgram = exports.updateProgram = exports.createProgram = exports.getPrograms = void 0;
const Program_1 = require("../models/Program");
const program_validator_1 = require("../validators/program.validator");
const apiResponse_1 = require("../utils/apiResponse");
const appError_1 = require("../utils/appError");
const getPrograms = async (req, res, next) => {
    try {
        const status = req.query.status ?? "active";
        const criteria = status === "all" ? {} : { status };
        const items = await Program_1.Program.find(criteria).sort({ startDate: 1, createdAt: -1 });
        return (0, apiResponse_1.sendSuccess)(res, { items, count: items.length }, "Programs fetched successfully.");
    }
    catch (error) {
        return next(error);
    }
};
exports.getPrograms = getPrograms;
const createProgram = async (req, res, next) => {
    try {
        const input = (0, program_validator_1.validateProgramCreateInput)(req.body);
        const program = await Program_1.Program.create(input);
        return (0, apiResponse_1.sendSuccess)(res, program, "Program created successfully.", 201);
    }
    catch (error) {
        return next(error);
    }
};
exports.createProgram = createProgram;
const updateProgram = async (req, res, next) => {
    try {
        const updates = (0, program_validator_1.validateProgramUpdateInput)(req.body);
        const program = await Program_1.Program.findByIdAndUpdate(req.params.id, updates, {
            new: true,
            runValidators: true
        });
        if (!program) {
            throw new appError_1.AppError("Program not found", 404);
        }
        return (0, apiResponse_1.sendSuccess)(res, program, "Program updated successfully.");
    }
    catch (error) {
        return next(error);
    }
};
exports.updateProgram = updateProgram;
const deleteProgram = async (req, res, next) => {
    try {
        const program = await Program_1.Program.findByIdAndDelete(req.params.id);
        if (!program) {
            throw new appError_1.AppError("Program not found", 404);
        }
        return (0, apiResponse_1.sendSuccess)(res, null, "Program deleted successfully.");
    }
    catch (error) {
        return next(error);
    }
};
exports.deleteProgram = deleteProgram;
//# sourceMappingURL=program.controller.js.map