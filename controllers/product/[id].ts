import type { NextApiRequest, NextApiResponse } from "next";

import { dbAllProducts } from "connections/algolia";
import * as Yup from "yup";

export async function searchProduct(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query as any;
  const idProduct = Yup.string().required();

  try {
    await idProduct.validate(id);
  } catch (error) {
    res.send({ success: false, message: error + "no es un string" });
  }
  try {
    const product = await dbAllProducts.getObject(id);

    res.send({
      success: true,
      message: "Producto encontrado",
      data: product,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
}
