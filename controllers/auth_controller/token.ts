import { NextApiRequest, NextApiResponse } from "next";
import { Auth, findOneAuth } from "models/auth";
import { User, findOneUserById } from "models/user";
import { generateToken } from "lib/tokenGenerate";

export async function tokenController(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, code } = req.body;

  try {
    const auth = await findOneAuth(email, code);

    if (auth) {
      const userId = auth.get("userId");
      const user = await findOneUserById(userId);
      const dateExpire = auth.get("expire");
      const dateNew = new Date();
      if (dateExpire < dateNew) {
        res.send({
          success: false,
          message: "Codigo expirado",
        });
      } else {
        const token = generateToken(user);
        res.send({
          success: true,
          token,
          message: "Token generado",
        });
      }
    } else {
      res.send({
        success: false,
        message: "Codigo incorrecto o email incorrecto",
      });
    }
  } catch (error) {
    res.send({
      success: false,
      message: "error:" + error,
    });
  }
}
