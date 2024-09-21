import type { NextApiRequest, NextApiResponse } from "next";
import { handlerCORS, middleware } from "controllers/middleware";
import methods from "micro-method-router";
import { updateUserController } from "controllers/me/update";

async function updateUser(req: NextApiRequest, res: NextApiResponse) {
  await updateUserController(req, res);
}

const handleUpdate = methods({
  patch: (req: NextApiRequest, res: NextApiResponse) => updateUser(req, res),
});

const updateUserMiddleware = middleware(handleUpdate);

export default handlerCORS(updateUserMiddleware);
