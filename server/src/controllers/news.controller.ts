import { NextFunction, Request, Response } from "express";
import { News } from "../models/News";
import {
  validateNewsCreateInput,
  validateNewsUpdateInput
} from "../validators/news.validator";
import { sendSuccess } from "../utils/apiResponse";
import { AppError } from "../utils/appError";

export const getNews = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const status = (req.query.status as string) ?? "published";
    const criteria = status === "all" ? {} : { status };
    const items = await News.find(criteria).sort({ publishedAt: -1, createdAt: -1 });
    return sendSuccess(res, { items, count: items.length }, "News fetched successfully.");
  } catch (error) {
    return next(error);
  }
};

export const getNewsBySlug = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const item = await News.findOne({ slug: req.params.slug });
    if (!item) {
      throw new AppError("News article not found", 404);
    }
    return sendSuccess(res, item, "News article fetched successfully.");
  } catch (error) {
    return next(error);
  }
};

export const createNews = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const input = validateNewsCreateInput(req.body);
    const news = await News.create(input);
    return sendSuccess(res, news, "News article created successfully.", 201);
  } catch (error) {
    return next(error);
  }
};

export const updateNews = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updates = validateNewsUpdateInput(req.body);
    const news = await News.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true
    });
    if (!news) {
      throw new AppError("News article not found", 404);
    }
    return sendSuccess(res, news, "News article updated successfully.");
  } catch (error) {
    return next(error);
  }
};

export const deleteNews = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const news = await News.findByIdAndDelete(req.params.id);
    if (!news) {
      throw new AppError("News article not found", 404);
    }
    return sendSuccess(res, null, "News article deleted successfully.");
  } catch (error) {
    return next(error);
  }
};

