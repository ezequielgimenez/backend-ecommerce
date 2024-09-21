import type { NextApiRequest, NextApiResponse } from "next";
import { authController } from "controllers/auth_controller";
import { handlerCORS } from "controllers/middleware";
import methods from "micro-method-router";

async function handleAuth(req: NextApiRequest, res: NextApiResponse) {
  await authController(req, res);
}

const handler = methods({
  post: handleAuth,
});

// post: (req: NextApiRequest, res: NextApiResponse) => handleAuth(req, res)

export default handlerCORS(handler);
