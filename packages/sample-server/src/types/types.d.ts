import { FromSchema } from "json-schema-to-ts";
import { userSchema } from "../schemas/user";
import { presentationRequestSchema } from "../schemas/presentationRequestSchema";

export type User = FromSchema<typeof userSchema>;
export type PresentationRequest = FromSchema<typeof presentationRequestSchema>;