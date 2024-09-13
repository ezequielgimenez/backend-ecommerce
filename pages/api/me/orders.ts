import type { NextApiRequest, NextApiResponse } from "next";
import { middleware } from "controllers/middleware";
import methods from "micro-method-router";
import { getOrdersController } from "controllers/me/orders";

async function getOrders(req: NextApiRequest, res: NextApiResponse) {
  await getOrdersController(req, res);
}

const handleOrders = methods({
  get: (req: NextApiRequest, res: NextApiResponse) => getOrders(req, res),
});

export default middleware(handleOrders);
