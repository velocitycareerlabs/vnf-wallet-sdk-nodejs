"use strict";
import { describe, expect, test, beforeAll, afterAll } from "@jest/globals";
import app from "../src/App";
import { FastifyInstance } from "fastify";

import { VCLImpl } from "@velocitycareerlabs/vnf-nodejs-wallet-sdk/src/impl/VCLImpl";
import VCLInitializationDescriptor from "packages/sdk/src/api/entities/initialization/VCLInitializationDescriptor";
import VCLCountries from "@velocitycareerlabs/vnf-nodejs-wallet-sdk/src/api/entities/VCLCountries";
import VCLEnvironment from "@velocitycareerlabs/vnf-nodejs-wallet-sdk/src/api/VCLEnvironment";
import VCLCryptoServicesDescriptor from "packages/sdk/src/api/entities/initialization/VCLCryptoServicesDescriptor";
import { JwtSignServiceMock } from "./mocks/jwt/JwtSignServiceMock";
import { JwtVerifyServiceMock } from "./mocks/jwt/JwtVerifyServiceMock";
import { KeyServiceMock } from "./mocks/key/KeyServiceMock";

describe("initalization flow", () => {
    let appInstance: FastifyInstance;
    const vcl = new VCLImpl();
    beforeAll(async () => {
        appInstance = await app({ logger: true });
    });

    afterAll(async () => {
        await appInstance.close();
    });

    test("App initialization", async () => {
        await vcl.initialize(
            new VCLInitializationDescriptor(VCLEnvironment.DEV,
                new VCLCryptoServicesDescriptor(
                    new KeyServiceMock(),
                    new JwtSignServiceMock(),
                    new JwtVerifyServiceMock()
                )
            ));
        console.log(
            "#Credential Types: %s",
            vcl.credentialTypesModel?.data?.all?.length ?? 0
        );
        console.log(
            "#Credential Type Schemas: %s",
            Object.keys(vcl.credentialTypeSchemasModel?.data?.all ?? {}).length
        );
        console.log("#Countries: %s", vcl.countriesModel?.data?.all?.length ?? 0);

        const afghanistanCountry = vcl.countriesModel?.data?.countryByCode(
            VCLCountries.AF
        );
        const afghanistanRegions = afghanistanCountry?.regions;

        const AfghanistanRegion1Name = "Balkh Province";
        const AfghanistanRegion1Code = "BAL";
        const AfghanistanRegion2Name = "Bamyan Province";
        const AfghanistanRegion2Code = "BAM";
        const AfghanistanRegion3Name = "Badghis Province";
        const AfghanistanRegion3Code = "BDG";

        expect(afghanistanCountry?.code == "AF").toBeTruthy();
        expect(afghanistanCountry?.name == "Afghanistan").toBeTruthy();

        expect(
            afghanistanRegions?.all[0].name === AfghanistanRegion1Name
        ).toBeTruthy();
        expect(
            afghanistanRegions?.all[0].code === AfghanistanRegion1Code
        ).toBeTruthy();
        expect(
            afghanistanRegions?.all[1].name === AfghanistanRegion2Name
        ).toBeTruthy();
        expect(
            afghanistanRegions?.all[1].code === AfghanistanRegion2Code
        ).toBeTruthy();
        expect(
            afghanistanRegions?.all[2].name === AfghanistanRegion3Name
        ).toBeTruthy();
        expect(
            afghanistanRegions?.all[2].code == AfghanistanRegion3Code
        ).toBeTruthy();
    }, 400000);
});