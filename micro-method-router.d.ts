declare module "micro-method-router" {
  import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

  type MethodHandler = (
    req: NextApiRequest,
    res: NextApiResponse
  ) => void | Promise<void>;

  interface Methods {
    get?: MethodHandler;
    post?: MethodHandler;
    put?: MethodHandler;
    delete?: MethodHandler;
    patch?: MethodHandler;
    [key: string]: MethodHandler | undefined;
  }

  export default function methods(handlers: Methods): NextApiHandler;
}
