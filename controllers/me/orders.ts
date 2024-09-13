import type { NextApiRequest, NextApiResponse } from "next";

import { findAllOrders } from "models/orders";

export async function getOrdersController(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = (req as any).userData;

  try {
    const userId = data.id;
    const myOrders = await findAllOrders(userId);
    if (myOrders.length === 0) {
      res.status(404).send({
        success: false,
        message: "No se encontro la orden con ese id",
        data: myOrders,
      });
    } else {
      res.send({
        success: true,
        message: "Orden encontrada",
        data: myOrders,
      });
    }
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
}
