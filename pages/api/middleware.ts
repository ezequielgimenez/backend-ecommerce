import { NextResponse, type NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const headers = {
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Origin": req.headers.get("Origin") || "*", // Permitir solo el origen de la solicitud
    "Access-Control-Allow-Methods": "GET, OPTIONS, PATCH, DELETE, POST, PUT",
    "Access-Control-Allow-Headers":
      req.headers.get("Access-Control-Request-Headers") || "",
  };

  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers,
    });
  }

  const response = NextResponse.next();
  Object.entries(headers).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  return response;
}

export const config = {
  matcher: ["/api/:path*"],
};
