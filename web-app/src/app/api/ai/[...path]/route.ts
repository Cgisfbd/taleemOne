import { NextRequest, NextResponse } from "next/server";
import { AI_API_URL, AI_SECRET_KEY } from "@/shared/config/env";

export const dynamic = "force-dynamic";

function getTargetAiUrl(pathSegments: string[], search: string): string {
  const configuredBase =
    AI_API_URL ||
    process.env.NEXT_PUBLIC_AI_API_URL?.trim() ||
    process.env.AI_API_URL?.trim();

  if (!configuredBase) {
    throw new Error(
      "AI Cognitive Microservice URL configuration is missing (NEXT_PUBLIC_AI_API_URL)."
    );
  }

  // Normalize localhost to 127.0.0.1 for Windows IPv4 network reliability
  const normalizedBase = configuredBase
    .replace("localhost", "127.0.0.1")
    .replace(/\/+$/, "");

  const pathStr = pathSegments.join("/");
  return `${normalizedBase}/${pathStr}${search}`;
}

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  const { path } = await context.params;

  let targetUrl: string;
  try {
    targetUrl = getTargetAiUrl(path, request.nextUrl.search);
  } catch (err: any) {
    return NextResponse.json(
      {
        statusCode: 500,
        message: err.message,
      },
      { status: 500 }
    );
  }

  const secretKey =
    AI_SECRET_KEY ||
    process.env.NEXT_PUBLIC_AI_SECRET_KEY?.trim() ||
    process.env.AI_SECRET_KEY?.trim() ||
    request.headers.get("x-ai-secret-key");

  if (!secretKey) {
    return NextResponse.json(
      {
        statusCode: 401,
        message:
          "AI security configuration is missing: Handshake secret key is required.",
      },
      { status: 401 }
    );
  }

  try {
    const body = await request.text();

    const res = await fetch(targetUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-AI-Secret-Key": secretKey,
      },
      body,
      cache: "no-store",
    });

    const responseText = await res.text();
    let data: unknown;
    try {
      data = JSON.parse(responseText);
    } catch {
      data = { message: responseText };
    }

    return NextResponse.json(data, { status: res.status });
  } catch (error: any) {
    console.error(`[AI Gateway Proxy] POST ${targetUrl} failed:`, error?.message);

    const isConnRefused =
      error?.cause?.code === "ECONNREFUSED" ||
      error?.code === "ECONNREFUSED" ||
      error?.message?.includes("ECONNREFUSED") ||
      error?.message?.includes("fetch failed");

    const message = isConnRefused
      ? "AI Cognitive Microservice (Port 5001) is currently unreachable. Please verify that the AI microservice is active."
      : error?.message || "Failed to communicate with AI Cognitive Microservice.";

    return NextResponse.json(
      {
        statusCode: 503,
        message,
      },
      { status: 503 }
    );
  }
}
