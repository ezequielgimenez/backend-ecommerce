import type { NextApiRequest, NextApiResponse } from "next";
import { myAirtable } from "connections/airtable";
import { dbAllProducts, dbProductsDest } from "connections/algolia";

export async function syncProductsController(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    myAirtable("productos")
      .select()
      .eachPage(
        async function (records, fetchNextPage) {
          const results = records.map((i) => {
            return {
              objectID: i.id,
              ...i.fields,
            };
          });

          // Add record to an index
          await dbAllProducts.saveObjects(results);

          fetchNextPage();
          res.send({
            success: true,
            message: "Data sincronizada",
            results,
          });
        },
        function done(err) {
          if (err) {
            console.error(err);
            res.send({
              success: false,
              message: err,
            });
            return;
          }
        }
      );
  } else {
    res.status(405).json("Method no allowed");
  }
}

export async function syncProductsDestController(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    myAirtable("productosDestacados")
      .select()
      .eachPage(
        async function (records, fetchNextPage) {
          const results = records.map((i) => {
            return {
              objectID: i.id,
              ...i.fields,
            };
          });

          // Add record to an index
          await dbProductsDest.saveObjects(results);

          fetchNextPage();
          res.send({
            success: true,
            message: "Data sincronizada",
            results,
          });
        },
        function done(err) {
          if (err) {
            console.error(err);
            res.send({
              success: false,
              message: err,
            });
            return;
          }
        }
      );
  } else {
    res.status(405).json("Method no allowed");
  }
}
