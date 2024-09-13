import type { NextApiRequest, NextApiResponse } from "next";
import { ipnController } from "controllers/notification_order";
import { getMerchantOrder } from "lib/mercadopago";
import { Order } from "associations/associations";
import { User } from "associations/associations";
import { sendEmailPayment } from "lib/sendEmail";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  await ipnController(req, res);
}
