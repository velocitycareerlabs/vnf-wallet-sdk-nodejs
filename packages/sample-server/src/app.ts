import fastify, { FastifyInstance, FastifyServerOptions } from "fastify";
import autoload from "@fastify/autoload";
import path from "path";
import { errorSchema } from "./schemas/errorSchema";
// import vclSdkPlugin from "./plugins/vclSdkPlugin";
import { presentationRequestSchema } from "./schemas/presentationRequestSchema";
import { deepLinkSchema } from "./schemas/deepLinkSchema";
interface buildOpts extends FastifyServerOptions {}

const build = (opts: buildOpts = {}): FastifyInstance => {
    const app = fastify(opts);

    // add in common schemas
    app.addSchema(deepLinkSchema);
    app.addSchema(presentationRequestSchema);
    app.addSchema(errorSchema);

    // app.register(vclSdkPlugin);

    app.register(autoload, {
        dir: path.join(__dirname, "routes"),
    });

    return app;
};

export default build;
