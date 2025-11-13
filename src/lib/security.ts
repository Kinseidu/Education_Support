/**
 * Security Utilities for Adomako EduSupport Foundation Website
 * 
 * This file contains security-related utilities and configurations
 * to protect against common web vulnerabilities.
 */

/**
 * Sanitizes HTML to prevent XSS attacks
 * Removes potentially dangerous HTML tags and attributes
 */
export function sanitizeHtml(html: string): string {
  const div = document.createElement('div');
  div.textContent = html;
  return div.innerHTML;
}

/**
 * Validates and sanitizes URL to prevent open redirect attacks
 * Only allows relative URLs or URLs from the same origin
 */
export function sanitizeUrl(url: string): string {
  try {
    const parsedUrl = new URL(url, window.location.origin);
    
    // Only allow same-origin URLs or relative URLs
    if (parsedUrl.origin !== window.location.origin) {
      return '/';
    }
    
    return parsedUrl.pathname + parsedUrl.search + parsedUrl.hash;
  } catch {
    // If URL parsing fails, return safe default
    return '/';
  }
}

/**
 * Encodes data for safe inclusion in URLs
 * Prevents injection attacks through URL parameters
 */
export function encodeUrlParameter(param: string): string {
  return encodeURIComponent(param);
}

/**
 * Rate limiting helper for client-side requests
 * Prevents abuse of forms and API endpoints
 */
export class RateLimiter {
  private requests: Map<string, number[]> = new Map();
  
  constructor(
    private maxRequests: number = 5,
    private windowMs: number = 60000 // 1 minute
  ) {}
  
  isAllowed(key: string): boolean {
    const now = Date.now();
    const requests = this.requests.get(key) || [];
    
    // Remove old requests outside the window
    const recentRequests = requests.filter(time => now - time < this.windowMs);
    
    if (recentRequests.length >= this.maxRequests) {
      return false;
    }
    
    recentRequests.push(now);
    this.requests.set(key, recentRequests);
    return true;
  }
  
  reset(key: string): void {
    this.requests.delete(key);
  }
}

/**
 * Security Headers Configuration
 * These should be implemented on the server/CDN level
 */
export const SECURITY_HEADERS = {
  'Content-Security-Policy': [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'", // Note: Remove unsafe-inline/unsafe-eval in production
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: https:",
    "connect-src 'self'",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'"
  ].join('; '),
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'geolocation=(), microphone=(), camera=()'
};

/**
 * Validates file uploads to prevent malicious files
 */
export function validateFileUpload(file: File, options: {
  maxSize?: number; // in bytes
  allowedTypes?: string[];
  allowedExtensions?: string[];
} = {}): { valid: boolean; error?: string } {
  const {
    maxSize = 5 * 1024 * 1024, // 5MB default
    allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'],
    allowedExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.pdf']
  } = options;
  
  // Check file size
  if (file.size > maxSize) {
    return {
      valid: false,
      error: `File size must be less than ${maxSize / 1024 / 1024}MB`
    };
  }
  
  // Check MIME type
  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: 'Invalid file type'
    };
  }
  
  // Check file extension
  const extension = '.' + file.name.split('.').pop()?.toLowerCase();
  if (!allowedExtensions.includes(extension)) {
    return {
      valid: false,
      error: 'Invalid file extension'
    };
  }
  
  return { valid: true };
}

/**
 * Password strength validator
 * Returns strength score from 0-4 and feedback
 */
export function validatePasswordStrength(password: string): {
  score: number;
  feedback: string[];
} {
  const feedback: string[] = [];
  let score = 0;
  
  if (password.length >= 12) score++;
  else feedback.push('Use at least 12 characters');
  
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
  else feedback.push('Include both uppercase and lowercase letters');
  
  if (/\d/.test(password)) score++;
  else feedback.push('Include at least one number');
  
  if (/[^a-zA-Z0-9]/.test(password)) score++;
  else feedback.push('Include at least one special character');
  
  return { score, feedback };
}
