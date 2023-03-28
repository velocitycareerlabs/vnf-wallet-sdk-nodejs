import { FastifyInstance } from "fastify";
import { User } from "../../types/types";
import { FromSchema } from "json-schema-to-ts";
import { userSchema } from "../../schemas/user";

const getUserParamsSchema = {
  type: "object",
  properties: {
    userId: { type: "string" },
  },
  required: ["userId"],
} as const;

interface getUserRequestInterface {
  Params: FromSchema<typeof getUserParamsSchema>;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async function routes(fastify: FastifyInstance) {
  const summary = "Get user details";
  fastify.get<getUserRequestInterface>(
    "/:userId",
    {
      schema: {
        params: getUserParamsSchema,
        response: {
          200: userSchema,
          "4xx": { $ref: "errorSchema#" },
        },
      },
    },
    async (request) => {
      const { userId } = request.params;
      const userResponse: User = {
        id: userId,
        firstName: "John",
        lastName: "Doe",
      };

      return userResponse;
    }
  );
}
