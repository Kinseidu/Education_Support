import validator from "validator";
import { AppError } from "../utils/appError";
import { sanitizeText } from "../utils/sanitizer";

export interface NewsInput {
  title: string;
  content: string;
  excerpt?: string;
  category?: string;
  status?: "draft" | "published";
  coverImageUrl?: string;
  publishedAt?: Date;
}

const validateBase = (
  payload: Partial<NewsInput>,
  requireAll = true
): Partial<NewsInput> => {
  const errors: Record<string, string> = {};

  const title = payload.title ?? "";
  if (requireAll || title) {
    if (validator.isEmpty(title.trim())) {
      errors.title = "Title is required.";
    } else if (!validator.isLength(title.trim(), { min: 3, max: 200 })) {
      errors.title = "Title must be between 3 and 200 characters.";
    }
  }

  const content = payload.content ?? "";
  if (requireAll || content) {
    if (validator.isEmpty(content.trim())) {
      errors.content = "Content is required.";
    } else if (!validator.isLength(content.trim(), { min: 20 })) {
      errors.content = "Content must be at least 20 characters.";
    }
  }

  const status = (payload.status ?? "draft").toLowerCase();
  if (status && !["draft", "published"].includes(status)) {
    errors.status = "Status must be either draft or published.";
  }

  const coverImageUrl = payload.coverImageUrl ?? "";
  if (coverImageUrl && !validator.isURL(coverImageUrl, { protocols: ["http", "https"], require_protocol: true })) {
    errors.coverImageUrl = "Cover image must be a valid URL.";
  }

  if (Object.keys(errors).length) {
    throw new AppError("Validation failed", 422, true, errors);
  }

  const sanitized: Partial<NewsInput> = {};

  if (title) sanitized.title = sanitizeText(title);
  if (content) sanitized.content = sanitizeText(content);
  if (payload.excerpt) sanitized.excerpt = sanitizeText(payload.excerpt);
  if (payload.category) sanitized.category = sanitizeText(payload.category);
  sanitized.status = status as "draft" | "published";
  if (coverImageUrl) sanitized.coverImageUrl = sanitizeText(coverImageUrl);
  if (payload.publishedAt) sanitized.publishedAt = payload.publishedAt;
  if (!payload.publishedAt && sanitized.status === "published") {
    sanitized.publishedAt = new Date();
  }

  return sanitized;
};

export const validateNewsCreateInput = (payload: Partial<NewsInput>): NewsInput => {
  const validated = validateBase(payload, true);
  return validated as NewsInput;
};

export const validateNewsUpdateInput = (payload: Partial<NewsInput>): Partial<NewsInput> => {
  return validateBase(payload, false);
};

