import type { NextApiRequest, NextApiResponse } from "next";
import { middleware } from "controllers/middleware";
import methods from "micro-method-router";

function authMe(req: NextApiRequest, res: NextApiResponse) {
  const data = (req as any).userData;
  res.send({
    success: true,
    data,
    message: "data del usuario",
  });
}

const handleOrder = methods({
  get: (req: NextApiRequest, res: NextApiResponse) => authMe(req, res),
});

export default middleware(handleOrder);
