export interface ApiErrorPayload {
  message: string;
  status?: number;
  errors?: Record<string, string | string[]>;
}

export class ApiError extends Error {
  status: number;
  errors?: Record<string, string | string[]>;

  constructor({ message, status = 0, errors }: ApiErrorPayload) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.errors = errors;
  }
}

const normalizeBaseUrl = (value?: string) => {
  if (!value) {
    return "";
  }
  return value.endsWith("/") ? value.slice(0, -1) : value;
};

const API_BASE_URL =
  normalizeBaseUrl(import.meta.env.VITE_API_URL as string | undefined) ||
  "http://localhost:5000";

type RequestBody = BodyInit | Record<string, unknown> | undefined;

interface RequestOptions extends Omit<RequestInit, "body"> {
  body?: RequestBody;
}

const isFormData = (body: RequestBody): body is FormData => {
  return typeof FormData !== "undefined" && body instanceof FormData;
};

const buildUrl = (path: string) => {
  if (/^https?:\/\//i.test(path)) {
    return path;
  }
  if (!path.startsWith("/")) {
    return `${API_BASE_URL}/${path}`;
  }
  return `${API_BASE_URL}${path}`;
};

const parsePayload = async (response: Response) => {
  const contentType = response.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    return response.json();
  }

  const text = await response.text();
  return text ? { message: text } : {};
};

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { body, headers: rawHeaders, ...rest } = options;
  const headers = new Headers(rawHeaders);
  let requestBody = body;

  if (body && !isFormData(body) && typeof body === "object") {
    headers.set("Content-Type", "application/json");
    requestBody = JSON.stringify(body);
  }

  let response: Response;
  try {
    response = await fetch(buildUrl(path), {
      ...rest,
      headers,
      body: requestBody,
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Unable to reach the server. Please check your connection.";
    throw new ApiError({
      message,
      status: 0,
    });
  }

  const payload = await parsePayload(response);
  const isSuccess = response.ok && (!payload || payload.success !== false);

  if (!isSuccess) {
    const message =
      typeof payload?.message === "string"
        ? payload.message
        : response.statusText || "Request failed";
    throw new ApiError({
      message,
      status: response.status,
      errors: payload?.errors,
    });
  }

  if (payload && typeof payload === "object" && "data" in payload) {
    return payload.data as T;
  }

  return payload as T;
}

export const apiClient = {
  get<T>(path: string, options?: RequestOptions) {
    return request<T>(path, { ...(options ?? {}), method: "GET" });
  },

  post<T>(path: string, body?: RequestBody, options?: RequestOptions) {
    return request<T>(path, {
      ...(options ?? {}),
      method: "POST",
      body,
    });
  },

  put<T>(path: string, body?: RequestBody, options?: RequestOptions) {
    return request<T>(path, {
      ...(options ?? {}),
      method: "PUT",
      body,
    });
  },

  patch<T>(path: string, body?: RequestBody, options?: RequestOptions) {
    return request<T>(path, {
      ...(options ?? {}),
      method: "PATCH",
      body,
    });
  },

  delete<T>(path: string, options?: RequestOptions) {
    return request<T>(path, { ...(options ?? {}), method: "DELETE" });
  },
};

export const apiConfig = {
  baseUrl: API_BASE_URL,
};


