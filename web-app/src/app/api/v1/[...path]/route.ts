import { NextRequest, NextResponse } from "next/server";
import { API_BASE_URL } from "@/shared/config/env";

export const dynamic = "force-dynamic";

function getTargetUrl(pathStr: string, search: string): string {
  // Use configured API_BASE_URL, normalizing localhost to 127.0.0.1 for Windows IPv4 reliability
  const base = (API_BASE_URL || "http://127.0.0.1:3001").replace("localhost", "127.0.0.1");
  return `${base}/api/v1/${pathStr}${search}`;
}

function buildForwardHeaders(request: NextRequest): HeadersInit {
  const headers: Record<string, string> = {
    "accept-language": request.headers.get("accept-language") || "en",
  };

  // Securely inject X-App-Secret from server-side environment or request (Zero hardcoded fallbacks)
  const appSecret =
    request.headers.get("x-app-secret") ||
    process.env.APP_SECRET ||
    process.env.APP_CLIENT_SECRET ||
    process.env.X_APP_SECRET;
  if (appSecret) {
    headers["x-app-secret"] = appSecret;
    headers["x-client-secret"] = appSecret;
  }

  // Forward incoming Bearer Authorization header for authenticated endpoints like /api/v1/auth/me
  let authHeader = request.headers.get("authorization");
  if (authHeader) {
    // Deduplicate if incoming header contains comma-separated duplicate tokens
    if (authHeader.includes(",")) {
      const parts = authHeader.split(",").map((s) => s.trim());
      const bearerPart = parts.find((p) => /^Bearer\s+\S+/i.test(p)) || parts[0];
      authHeader = bearerPart;
    }
    headers["authorization"] = authHeader;
  }

  // Forward incoming browser cookies (for session / refresh endpoints)
  const cookieHeader = request.headers.get("cookie");
  if (cookieHeader) {
    headers["cookie"] = cookieHeader;
  }

  const contentType = request.headers.get("content-type");
  if (contentType) {
    headers["content-type"] = contentType;
  }

  return headers;
}

function handleProxyResponse(res: Response, data: unknown): NextResponse {
  const response = NextResponse.json(data, { status: res.status });

  // Forward backend-issued HttpOnly Set-Cookie headers to browser
  const setCookies =
    typeof (res.headers as any).getSetCookie === "function"
      ? (res.headers as any).getSetCookie()
      : [res.headers.get("set-cookie")].filter(Boolean);

  for (const cookieStr of setCookies) {
    if (cookieStr) {
      response.headers.append("set-cookie", cookieStr);
    }
  }

  return response;
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  const { path } = await context.params;
  const pathStr = path.join("/");
  const targetUrl = getTargetUrl(pathStr, request.nextUrl.search);

  try {
    const res = await fetch(targetUrl, {
      method: "GET",
      headers: buildForwardHeaders(request),
      cache: "no-store",
    });

    const text = await res.text();
    let data: unknown;
    try {
      data = JSON.parse(text);
    } catch {
      data = { message: text };
    }
    return handleProxyResponse(res, data);
  } catch (error: any) {
    console.error(`[Trusted API Proxy] GET ${targetUrl} failed:`, error?.message);
    return NextResponse.json(
      {
        statusCode: 502,
        code: "BACKEND_UNAVAILABLE",
        message: "Failed to communicate with backend service",
      },
      { status: 502 }
    );
  }
}

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  const { path } = await context.params;
  const pathStr = path.join("/");
  const targetUrl = getTargetUrl(pathStr, request.nextUrl.search);

  try {
    const contentType = request.headers.get("content-type") || "";
    const isBinary =
      contentType.includes("multipart/form-data") ||
      contentType.includes("application/octet-stream") ||
      contentType.includes("image/");
    const body = isBinary ? await request.arrayBuffer() : await request.text();

    const res = await fetch(targetUrl, {
      method: "POST",
      headers: buildForwardHeaders(request),
      body,
      cache: "no-store",
    });

    const text = await res.text();
    let data: unknown;
    try {
      data = JSON.parse(text);
    } catch {
      data = { message: text };
    }
    return handleProxyResponse(res, data);
  } catch (error: any) {
    console.error(`[Trusted API Proxy] POST ${targetUrl} failed:`, error?.message);
    return NextResponse.json(
      {
        statusCode: 502,
        code: "BACKEND_UNAVAILABLE",
        message: "Failed to communicate with backend service",
      },
      { status: 502 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  const { path } = await context.params;
  const pathStr = path.join("/");
  const targetUrl = getTargetUrl(pathStr, request.nextUrl.search);

  try {
    const contentType = request.headers.get("content-type") || "";
    const isBinary =
      contentType.includes("multipart/form-data") ||
      contentType.includes("application/octet-stream") ||
      contentType.includes("image/");
    const body = isBinary ? await request.arrayBuffer() : await request.text();

    const res = await fetch(targetUrl, {
      method: "PUT",
      headers: buildForwardHeaders(request),
      body,
      cache: "no-store",
    });

    const text = await res.text();
    let data: unknown;
    try {
      data = JSON.parse(text);
    } catch {
      data = { message: text };
    }
    return handleProxyResponse(res, data);
  } catch (error: any) {
    console.error(`[Trusted API Proxy] PUT ${targetUrl} failed:`, error?.message);
    return NextResponse.json(
      {
        statusCode: 502,
        code: "BACKEND_UNAVAILABLE",
        message: "Failed to communicate with backend service",
      },
      { status: 502 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  const { path } = await context.params;
  const pathStr = path.join("/");
  const targetUrl = getTargetUrl(pathStr, request.nextUrl.search);

  try {
    const body = await request.text();
    const res = await fetch(targetUrl, {
      method: "PATCH",
      headers: buildForwardHeaders(request),
      body,
      cache: "no-store",
    });

    const text = await res.text();
    let data: unknown;
    try {
      data = JSON.parse(text);
    } catch {
      data = { message: text };
    }
    return handleProxyResponse(res, data);
  } catch (error: any) {
    console.error(`[Trusted API Proxy] PATCH ${targetUrl} failed:`, error?.message);
    return NextResponse.json(
      {
        statusCode: 502,
        code: "BACKEND_UNAVAILABLE",
        message: "Failed to communicate with backend service",
      },
      { status: 502 }
    );
  }
}
