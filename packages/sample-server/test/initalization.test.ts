"use strict";
import { describe, expect, test, beforeAll, afterAll } from "@jest/globals";
import app from "../src/app";
import { FastifyInstance } from "fastify";

import { VCLImpl } from "@velocitycareerlabs/vnf-nodejs-wallet-sdk/src/impl/VCLImpl";
import VCLInitializationDescriptor from "@velocitycareerlabs/vnf-nodejs-wallet-sdk/src/api/entities/VCLInitializationDescriptor";
import VCLCountries from "@velocitycareerlabs/vnf-nodejs-wallet-sdk/src/api/entities/VCLCountries";
import VCLEnvironment from "@velocitycareerlabs/vnf-nodejs-wallet-sdk/src/api/VCLEnvironment";

describe("initalization flow", () => {
    let appInstance: FastifyInstance;
    let vcl = new VCLImpl();
    beforeAll(async () => {
        appInstance = await app({ logger: true });
    });

    afterAll(async () => {
        await appInstance.close();
    });

    test("App initialization", async () => {
        let init = await vcl.initialize(
            new VCLInitializationDescriptor(VCLEnvironment.DEV)
        );
        console.log(
            "#Credential Types: %s",
            vcl.credentialTypesModel.data.all.length
        );
        console.log(
            "#Credential Type Schemas: %s",
            Object.keys(vcl.credentialTypeSchemasModel.data.all).length
        );
        console.log("#Countries: %s", vcl.countriesModel.data.all.length);

        let afghanistanCountry = vcl.countriesModel.data.countryByCode(
            VCLCountries.AF
        )!!;
        let afghanistanRegions = afghanistanCountry.regions;

        const AfghanistanRegion1Name = "Balkh Province";
        const AfghanistanRegion1Code = "BAL";
        const AfghanistanRegion2Name = "Bamyan Province";
        const AfghanistanRegion2Code = "BAM";
        const AfghanistanRegion3Name = "Badghis Province";
        const AfghanistanRegion3Code = "BDG";

        expect(afghanistanCountry.code == "AF").toBeTruthy();
        expect(afghanistanCountry.name == "Afghanistan").toBeTruthy();

        expect(
            afghanistanRegions.all[0].name == AfghanistanRegion1Name
        ).toBeTruthy();
        expect(
            afghanistanRegions.all[0].code == AfghanistanRegion1Code
        ).toBeTruthy();
        expect(
            afghanistanRegions.all[1].name == AfghanistanRegion2Name
        ).toBeTruthy();
        expect(
            afghanistanRegions.all[1].code == AfghanistanRegion2Code
        ).toBeTruthy();
        expect(
            afghanistanRegions.all[2].name == AfghanistanRegion3Name
        ).toBeTruthy();
        expect(
            afghanistanRegions.all[2].code == AfghanistanRegion3Code
        ).toBeTruthy();
    }, 400000);
});
