"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNews = exports.updateNews = exports.createNews = exports.getNewsBySlug = exports.getNews = void 0;
const News_1 = require("../models/News");
const news_validator_1 = require("../validators/news.validator");
const apiResponse_1 = require("../utils/apiResponse");
const appError_1 = require("../utils/appError");
const getNews = async (req, res, next) => {
    try {
        const status = req.query.status ?? "published";
        const criteria = status === "all" ? {} : { status };
        const items = await News_1.News.find(criteria).sort({ publishedAt: -1, createdAt: -1 });
        return (0, apiResponse_1.sendSuccess)(res, { items, count: items.length }, "News fetched successfully.");
    }
    catch (error) {
        return next(error);
    }
};
exports.getNews = getNews;
const getNewsBySlug = async (req, res, next) => {
    try {
        const item = await News_1.News.findOne({ slug: req.params.slug });
        if (!item) {
            throw new appError_1.AppError("News article not found", 404);
        }
        return (0, apiResponse_1.sendSuccess)(res, item, "News article fetched successfully.");
    }
    catch (error) {
        return next(error);
    }
};
exports.getNewsBySlug = getNewsBySlug;
const createNews = async (req, res, next) => {
    try {
        const input = (0, news_validator_1.validateNewsCreateInput)(req.body);
        const news = await News_1.News.create(input);
        return (0, apiResponse_1.sendSuccess)(res, news, "News article created successfully.", 201);
    }
    catch (error) {
        return next(error);
    }
};
exports.createNews = createNews;
const updateNews = async (req, res, next) => {
    try {
        const updates = (0, news_validator_1.validateNewsUpdateInput)(req.body);
        const news = await News_1.News.findByIdAndUpdate(req.params.id, updates, {
            new: true,
            runValidators: true
        });
        if (!news) {
            throw new appError_1.AppError("News article not found", 404);
        }
        return (0, apiResponse_1.sendSuccess)(res, news, "News article updated successfully.");
    }
    catch (error) {
        return next(error);
    }
};
exports.updateNews = updateNews;
const deleteNews = async (req, res, next) => {
    try {
        const news = await News_1.News.findByIdAndDelete(req.params.id);
        if (!news) {
            throw new appError_1.AppError("News article not found", 404);
        }
        return (0, apiResponse_1.sendSuccess)(res, null, "News article deleted successfully.");
    }
    catch (error) {
        return next(error);
    }
};
exports.deleteNews = deleteNews;
//# sourceMappingURL=news.controller.js.map