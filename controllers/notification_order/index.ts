import type { NextApiRequest, NextApiResponse } from "next";
import { getMerchantOrder } from "lib/mercadopago";
import { findOneOrderById, actualizarOrder } from "models/orders";
import { findOneUserById } from "models/user";
import { sendEmailPayment } from "lib/sendEmail";

export async function ipnController(req: NextApiRequest, res: NextApiResponse) {
  const { id, topic } = req.query;

  // Solo procesar si el topic es "merchant_order"
  if (topic === "merchant_order") {
    const order = await getMerchantOrder(id);

    // Verificar que el estado de la orden sea "paid"
    if (order.order_status === "paid") {
      const externalReference = order.external_reference;

      // Separar los IDs en caso de que sean múltiples
      const ids = externalReference.split(",").map((id) => id.trim());

      // Procesar cada ID
      for (const orderId of ids) {
        const myOrder = await findOneOrderById(orderId);

        if (myOrder) {
          await actualizarOrder(myOrder.get("id"), "paid", new Date());

          // Obtener el usuario de la orden
          const idUser = myOrder.get("userId");
          const userOrder = await findOneUserById(idUser);

          // Enviar el correo de confirmación
          if (userOrder) {
            const email = userOrder.email;
            const orderFind = myOrder.toJSON();
            const { title, price, img } = orderFind;
            await sendEmailPayment(email, title, price, img);
          }
        } else {
          console.error(`No se encontró la orden con ID: ${orderId}`);
        }
      }

      // Responder a Mercado Pago que el proceso fue exitoso
      return res.send({
        success: order.order_status,
        data: order,
      });
    }
  }

  // En caso de que el topic no sea "merchant_order" o el estado no sea "paid"
  res.status(400).json({ error: "Notificación no procesada." });
}
