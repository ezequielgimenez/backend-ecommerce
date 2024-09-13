import type { NextApiRequest, NextApiResponse } from "next";
import { middleware } from "controllers/middleware";
import methods from "micro-method-router";
import { getOrderController } from "controllers/order/[orderId]";

async function getOrder(req: NextApiRequest, res: NextApiResponse) {
  await getOrderController(req, res);
}

const handleOrder = methods({
  get: (req: NextApiRequest, res: NextApiResponse) => getOrder(req, res),
});

export default middleware(handleOrder);
