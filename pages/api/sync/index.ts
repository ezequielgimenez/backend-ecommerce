import type { NextApiRequest, NextApiResponse } from "next";
import { syncProductsController } from "controllers/sync_products";
import methods from "micro-method-router";
import { handlerCORS } from "controllers/middleware";

async function syncData(req: NextApiRequest, res: NextApiResponse) {
  await syncProductsController(req, res);
}

const handleSync = methods({
  get: syncData,
});

export default handlerCORS(handleSync);
