import { apiClient } from "./apiClient";

export interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactResponse {
  id: string;
  status: string;
}

export interface NewsletterPayload {
  email: string;
}

export interface NewsletterResponse {
  id: string;
  email: string;
}

export interface NewsArticle {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  category?: string;
  content: string;
  status: "draft" | "published";
  coverImageUrl?: string;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProgramItem {
  _id: string;
  title: string;
  description: string;
  location?: string;
  coverImageUrl?: string;
  status: "upcoming" | "active" | "completed";
  startDate?: string;
  endDate?: string;
  createdAt: string;
  updatedAt: string;
}

interface PaginatedResponse<T> {
  items: T[];
  count: number;
}

export const api = {
  contact: {
    submit: (payload: ContactPayload) =>
      apiClient.post<ContactResponse>("/api/contact", payload),
  },
  newsletter: {
    subscribe: (payload: NewsletterPayload) =>
      apiClient.post<NewsletterResponse>("/api/newsletter", payload),
  },
  news: {
    list: (status: "draft" | "published" | "all" = "published") =>
      apiClient.get<PaginatedResponse<NewsArticle>>(
        `/api/news${status ? `?status=${encodeURIComponent(status)}` : ""}`,
      ),
    getBySlug: (slug: string) =>
      apiClient.get<NewsArticle>(`/api/news/${encodeURIComponent(slug)}`),
  },
  programs: {
    list: (status: "upcoming" | "active" | "completed" | "all" = "active") =>
      apiClient.get<PaginatedResponse<ProgramItem>>(
        `/api/programs${status ? `?status=${encodeURIComponent(status)}` : ""}`,
      ),
  },
  contactInfo: {
    get: () => apiClient.get<{
      founderPhone: string;
      whatsappNumber: string;
      founderEmail: string;
      bankName: string;
      accountName: string;
      accountNumber: string;
    }>("/api/contact-info"),
  },
};


