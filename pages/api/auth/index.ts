import type { NextApiRequest, NextApiResponse } from "next";
import { authController } from "controllers/auth_controller";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  await authController(req, res);
}
