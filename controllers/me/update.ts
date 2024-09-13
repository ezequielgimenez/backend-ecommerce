import type { NextApiRequest, NextApiResponse } from "next";
import { verificarEmail } from "lib/verify-email";
import { actualizarDatosUser } from "models/user";

export async function updateUserController(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const newData = req.body;
  const data = (req as any).userData;
  if (newData.email) {
    const verifyEmail = await verificarEmail(data.email);
    if (!verifyEmail.success) {
      res.status(400).json({ verifyEmail });
    }
  }
  try {
    const userUpdate = await actualizarDatosUser(newData, data.id);
    if (userUpdate[0] > 0) {
      res.send({
        success: true,
        elEmail: newData.email,
        message: "User actualizado",
      });
    } else {
      res.send({
        success: false,
        message: "No se pudo actualizar el user",
      });
    }
  } catch (error) {
    res.send({
      success: false,
      message: "error" + error,
    });
  }
}
