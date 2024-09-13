import type { NextApiRequest, NextApiResponse } from "next";
import { syncProductsController } from "controllers/sync_products";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  await syncProductsController(req, res);
}
