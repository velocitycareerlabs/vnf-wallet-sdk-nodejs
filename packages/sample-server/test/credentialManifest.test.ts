"use strict";
import { describe, expect, test, beforeAll, afterAll } from "@jest/globals";
import app from "../src/app";
import { FastifyInstance } from "fastify";

import { VCLImpl } from "vnf-wallet-sdk-nodejs/dist/impl/VCLImpl";
import VCLInitializationDescriptor from "vnf-wallet-sdk-nodejs/dist/api/entities/VCLInitializationDescriptor";
import VCLCountries from "vnf-wallet-sdk-nodejs/dist/api/entities/VCLCountries";
import VCLEnvironment from "vnf-wallet-sdk-nodejs/dist/api/VCLEnvironment";
import CredentialManifestUseCaseImpl from "vnf-wallet-sdk-nodejs/dist/impl/data/usecases/CredentialManifestUseCaseImpl";

describe("initalization flow", () => {
    let appInstance: FastifyInstance;
    let subject = new CredentialManifestUseCaseImpl();
    beforeAll(async () => {
        appInstance = await app({ logger: true });
    });

    afterAll(async () => {
        await appInstance.close();
    });
});
