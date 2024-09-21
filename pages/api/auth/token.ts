import type { NextApiRequest, NextApiResponse } from "next";
import { tokenController } from "controllers/auth_controller/token";
import { handlerCORS } from "controllers/middleware";
import methods from "micro-method-router";

async function authToken(req: NextApiRequest, res: NextApiResponse) {
  await tokenController(req, res);
}

const handleAuthToken = methods({
  post: authToken,
});

export default handlerCORS(handleAuthToken);
