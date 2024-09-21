import type { NextApiRequest, NextApiResponse } from "next";
import { handlerCORS, middleware } from "controllers/middleware";
import methods from "micro-method-router";
import { createOrderController } from "controllers/order";

async function createOrder(req: NextApiRequest, res: NextApiResponse) {
  await createOrderController(req, res);
}

const handleOrder = methods({
  post: (req: NextApiRequest, res: NextApiResponse) => createOrder(req, res),
});

const createOrderMiddleware = middleware(handleOrder);

export default handlerCORS(createOrderMiddleware);
