import { FromSchema } from "json-schema-to-ts";
import { userSchema } from "../schemas/user";

export type User = FromSchema<typeof userSchema>;
