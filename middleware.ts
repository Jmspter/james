import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Simple in-memory rate limiter
// Note: In serverless environments (like Vercel), this memory is not shared across instances.
// For robust distributed rate limiting, use Redis (e.g., Upstash) or a dedicated service.
const rateLimitMap = new Map();

export function middleware(request: NextRequest) {
  // Get IP from header (reliable for most proxies including Vercel)
  const forwardedFor = request.headers.get('x-forwarded-for');
  const ip = forwardedFor ? forwardedFor.split(',')[0].trim() : '127.0.0.1';

  const limit = 20; // Requests per window
  const windowMs = 60 * 1000; // 1 minute

  if (!rateLimitMap.has(ip)) {
    rateLimitMap.set(ip, {
      count: 0,
      lastReset: Date.now(),
    });
  }

  const ipData = rateLimitMap.get(ip);

  if (Date.now() - ipData.lastReset > windowMs) {
    ipData.count = 0;
    ipData.lastReset = Date.now();
  }

  if (ipData.count >= limit) {
    return new NextResponse(
      JSON.stringify({ success: false, message: 'Too many requests' }),
      { status: 429, headers: { 'content-type': 'application/json' } }
    );
  }

  ipData.count += 1;
  
  // Cleanup old entries periodically to prevent memory leaks
  if (rateLimitMap.size > 10000) {
      rateLimitMap.clear(); 
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Apply to API routes and pages, skipping static assets
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
