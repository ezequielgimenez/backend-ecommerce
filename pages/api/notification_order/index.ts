import type { NextApiRequest, NextApiResponse } from "next";
import { ipnController } from "controllers/notification_order";
import methods from "micro-method-router";
import { handlerCORS } from "controllers/middleware";

async function createOrderPreference(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await ipnController(req, res);
}

const handleIPN = methods({
  post: createOrderPreference,
});

export default handlerCORS(handleIPN);
