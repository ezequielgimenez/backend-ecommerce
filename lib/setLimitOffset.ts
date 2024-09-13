import type { NextApiRequest } from "next";

export function setLimitOffset(req: NextApiRequest) {
  const maxLimit = 100;
  const maxOffset = 10000;

  const limitQuery = parseInt((req.query.limit as string) || "0");
  const offsetQuery = parseInt((req.query.offset as string) || "0");

  let limit = 100;

  if (limitQuery > 0 && limitQuery < maxLimit) {
    limit = limitQuery;
  } else if (limitQuery > maxLimit) {
    limit = maxLimit;
  }

  const offset = offsetQuery < maxOffset ? offsetQuery : 0;

  return {
    limit,
    offset,
  };
}
