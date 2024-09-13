import type { NextApiRequest, NextApiResponse } from "next";
import { middleware } from "controllers/middleware";
import methods from "micro-method-router";
import { querySearchController } from "controllers/search_products";

async function querySearch(req: NextApiRequest, res: NextApiResponse) {
  await querySearchController(req, res);
}

const handleSearch = methods({
  get: (req: NextApiRequest, res: NextApiResponse) => querySearch(req, res),
});

export default middleware(handleSearch);
