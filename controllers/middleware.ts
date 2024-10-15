import type { NextApiRequest, NextApiResponse } from "next";
import parseBearerToken from "parse-bearer-token";
import { decodificarToken } from "lib/tokenGenerate";
import NextCors from "nextjs-cors";

export function middleware(callback) {
  return function (req: NextApiRequest, res: NextApiResponse) {
    const queryToken = parseBearerToken(req);
    // const queryToken2 = req.headers["authorization"].split(" ")[1];
    const decode = decodificarToken(queryToken);
    if (!decode) {
      res.status(401).send({
        success: false,
        message: "error en el token",
      });
    } else {
      (req as any).userData = decode;
      callback(req, res);
    }
  };
}

export function handlerCORS(callback) {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    // Run the cors middleware
    // nextjs-cors uses the cors package, so we invite you to check the documentation https://github.com/expressjs/cors
    await NextCors(req, res, {
      // Options
      methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
      origin: "http://localhost:3000/",
      optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    });

    // Rest of the API logic
    callback(req, res);
    //res.json({ message: "Hello NextJs Cors!" });
  };
}
