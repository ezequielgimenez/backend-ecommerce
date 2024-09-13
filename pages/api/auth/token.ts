import type { NextApiRequest, NextApiResponse } from "next";
import { tokenController } from "controllers/auth_controller/token";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  await tokenController(req, res);
}
