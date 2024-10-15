import type { NextApiRequest, NextApiResponse } from "next";

import { setLimitOffset } from "lib/setLimitOffset";
import { dbAllProducts } from "connections/algolia";

export async function querySearchController(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { limit, offset } = setLimitOffset(req);
  const q = req.query.q as string;

  try {
    const resultados = await dbAllProducts.search(q, {
      // hitsPerPage <--     Es el número de elementos que muestra cada página.
      //page         <--   Obtiene la  página de resultados,empieza en 0
      hitsPerPage: limit,
      page: offset > 1 ? Math.floor(offset / limit) : 0,
    });
    // Ajusta los resultados para simular el offset
    const start = offset % limit; // Calcula el inicio
    const resultsAjustados = resultados.hits.slice(start, start + limit);
    const products = JSON.parse(JSON.stringify(resultsAjustados));
    const stockProducts = products.filter((i) => i.stock === "si");
    if (stockProducts.length === 0) {
      res.send({
        success: false,
        message: "No hay productos con stock",
      });
    }
    res.send({
      sucess: true,
      message: "Búsqueda exitosa",
      data: stockProducts,
      pagination: {
        offset,
        limit,
        total: resultados.nbHits,
      },
    });
  } catch (error) {
    res.send({
      success: false,
      message: error,
    });
  }
}
