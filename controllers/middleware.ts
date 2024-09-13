import type { NextApiRequest, NextApiResponse } from "next";
import parseBearerToken from "parse-bearer-token";
import { decodificarToken } from "lib/tokenGenerate";

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
