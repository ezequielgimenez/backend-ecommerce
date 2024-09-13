import type { NextApiRequest, NextApiResponse } from "next";
import { getMerchantOrder } from "lib/mercadopago";
import { findOneOrderById, actualizarOrder } from "models/orders";
import { findOneUserById } from "models/user";
import { sendEmailPayment } from "lib/sendEmail";

export async function ipnController(req: NextApiRequest, res: NextApiResponse) {
  const { id, topic } = req.query;
  if (topic == "merchant_order") {
    const order = await getMerchantOrder(id);
    if ((order.order_status = "paid")) {
      const id = order.external_reference;
      const myOrder = await findOneOrderById(id);
      await actualizarOrder(myOrder.get("id"), "paid", new Date());

      const idUser = myOrder.get("userId");
      const userOrder = await findOneUserById(idUser);
      if (userOrder) {
        const email = userOrder.email;
        const orderFind = myOrder.toJSON();
        const { title, price, img } = orderFind;
        await sendEmailPayment(email, title, price, img);
      }
      //mandar un email al vendedor con la data de la order que tiene todo los datos del comprador
      //aca creo que iria la conexion a websocket
    }
    res.send({
      success: order.order_status,
      data: order,
    });
  }
}
