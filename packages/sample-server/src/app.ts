import fastify, { FastifyInstance, FastifyServerOptions } from "fastify";
import autoload from "@fastify/autoload";
import path from "path";
import { userSchema } from "./schemas/user";
import { errorSchema } from "./schemas/error";

interface buildOpts extends FastifyServerOptions {
}

const build = (opts: buildOpts = {}): FastifyInstance => {
  const app = fastify(opts);

  // add in common schemas
  app.addSchema(userSchema);
  app.addSchema(errorSchema);

  app.register(autoload, {
    dir: path.join(__dirname, "routes"),
  });
  return app;
};

export default build;
