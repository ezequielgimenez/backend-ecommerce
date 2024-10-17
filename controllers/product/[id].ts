import type { NextApiRequest, NextApiResponse } from "next";

import { dbAllProducts, dbProductsDest } from "connections/algolia";
import * as Yup from "yup";

export async function searchProduct(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query as any;
  const idProduct = Yup.string().required();

  try {
    // Intentamos buscar primero en dbAllProducts
    let product = await dbAllProducts.getObject(id!);

    res.send({
      success: true,
      message: "Producto encontrado en dbAllProducts",
      data: product,
    });
  } catch (error) {
    console.log(
      "No se encontró en dbAllProducts, buscando en dbProductsDest..."
    );

    try {
      // Si no se encuentra en dbAllProducts, buscamos en dbProductsDest
      const product = await dbProductsDest.getObject(id!);
      res.send({
        success: true,
        message: "Producto encontrado en dbProductsDest",
        data: product,
      });
    } catch (secondError) {
      // Si no se encuentra en ninguna base, devolvemos un error
      res.status(404).send({
        success: false,
        message: "Producto no encontrado en ninguna base de datos.",
      });
    }
  }
}
