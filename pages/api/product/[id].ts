import type { NextApiRequest, NextApiResponse } from "next";
import { middleware } from "controllers/middleware";
import methods from "micro-method-router";
import { searchProduct } from "controllers/product/[id]";

async function searchProd(req: NextApiRequest, res: NextApiResponse) {
  await searchProduct(req, res);
}

const handleSearch = methods({
  get: (req: NextApiRequest, res: NextApiResponse) => searchProd(req, res),
});

export default middleware(handleSearch);
