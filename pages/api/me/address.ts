import type { NextApiRequest, NextApiResponse } from "next";
import { handlerCORS, middleware } from "controllers/middleware";

import { updateItemController } from "controllers/me/address";
import methods from "micro-method-router";

async function updateItemUser(req: NextApiRequest, res: NextApiResponse) {
  await updateItemController(req, res);
}

const handleUpdate = methods({
  patch: (req: NextApiRequest, res: NextApiResponse) =>
    updateItemUser(req, res),
});

const updateMiddleware = middleware(handleUpdate);

export default handlerCORS(updateMiddleware);
