import { NextResponse, type NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const headers = {
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Origin": "*", // Cambia esto si necesitas un origen específico
    "Access-Control-Allow-Methods": "GET, OPTIONS, PATCH, DELETE, POST, PUT",
    "Access-Control-Allow-Headers":
      req.headers.get("Access-Control-Request-Headers") || "",
    "Content-Length": "0",
  };

  // Manejar las solicitudes OPTIONS
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers,
    });
  }

  // Para otras solicitudes, asegúrate de que también se envíen los headers CORS
  const response = NextResponse.next();
  Object.entries(headers).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  return response;
}

export const config = {
  matcher: ["/api/:path*"], // Aplica este middleware a todas las rutas que empiecen con /api/
};
