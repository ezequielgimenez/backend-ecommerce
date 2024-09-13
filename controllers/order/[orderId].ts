import type { NextApiRequest, NextApiResponse } from "next";

import { findOneOrderById } from "models/orders";

export async function getOrderController(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { orderId } = req.query as any;

  try {
    const myOrder = await findOneOrderById(orderId);
    if (myOrder) {
      res.send({
        success: true,
        message: "Orden encontrada",
      });
    } else {
      res.status(404).send({
        success: false,
        message: "No se encontro la orden",
      });
    }
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
}
