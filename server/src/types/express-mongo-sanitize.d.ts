declare module "express-mongo-sanitize" {
  import { Request, RequestHandler } from "express";
  function mongoSanitize(options?: { onSanitize?: (req: Request, key: string) => void }): RequestHandler;
  export default mongoSanitize;
}

