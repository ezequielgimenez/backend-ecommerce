import type { NextApiRequest, NextApiResponse } from "next";
import {
  findOrCreateAuth,
  actualizarAuth,
  updateAuth,
  findOneAuth,
} from "models/auth";
import { findOrCreateUser } from "models/user";

//libs
import { generateCode } from "lib/generateCode";
import { generateDateExpire } from "lib/generateExpires";
import { sendEmailCode } from "lib/sendEmail";
import { verificarEmail } from "lib/verify-email";

export async function authController(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const email = req.body.email;
  try {
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email no proporcionado",
      });
    }
    const verifyEmail = await verificarEmail(email);
    if (!verifyEmail) {
      res.status(400).json({
        success: false,
        message: "Correo no valido",
      });
    }

    const user = await findOrCreateUser(email);
    const userId = user.get("id");
    const auth = findOrCreateAuth(userId, email);
    if (user && auth) {
      const expire = generateDateExpire();
      const code = generateCode();
      await updateAuth(code, expire, userId);
      await sendEmailCode(email, code);
    }
    res.send({
      success: true,
      message: "Codigo enviado a su email",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error,
    });
  }
}
