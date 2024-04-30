"use strict";
import { describe, expect, test, beforeAll, afterAll } from "@jest/globals";
import app from "../src/app";
import { FastifyInstance } from "fastify";

import { VCLImpl } from "@velocitycareerlabs/vnf-nodejs-wallet-sdk/src/impl/VCLImpl";
import VCLInitializationDescriptor from "@velocitycareerlabs/vnf-nodejs-wallet-sdk/src/api/entities/VCLInitializationDescriptor";
import VCLCountries from "@velocitycareerlabs/vnf-nodejs-wallet-sdk/src/api/entities/VCLCountries";
import VCLEnvironment from "@velocitycareerlabs/vnf-nodejs-wallet-sdk/src/api/VCLEnvironment";
import VCLCryptoServicesDescriptor from "@velocitycareerlabs/vnf-nodejs-wallet-sdk/src/api/entities/VCLCryptoServicesDescriptor";
import VCLKeyService from "@velocitycareerlabs/vnf-nodejs-wallet-sdk/src/api/keys/VCLKeyService";
import VCLDidJwk from "@velocitycareerlabs/vnf-nodejs-wallet-sdk/src/api/entities/VCLDidJwk";
import VCLDidJwkDescriptor from "@velocitycareerlabs/vnf-nodejs-wallet-sdk/src/api/entities/VCLDidJwkDescriptor";
import VCLResult from "@velocitycareerlabs/vnf-nodejs-wallet-sdk/src/api/entities/VCLResult";
import VCLPublicJwk from "@velocitycareerlabs/vnf-nodejs-wallet-sdk/src/api/entities/VCLPublicJwk";
import VCLJwtSignService from "@velocitycareerlabs/vnf-nodejs-wallet-sdk/src/api/jwt/VCLJwtSignService";
import VCLJwtDescriptor from "@velocitycareerlabs/vnf-nodejs-wallet-sdk/src/api/entities/VCLJwtDescriptor";
import VCLJwt from "@velocitycareerlabs/vnf-nodejs-wallet-sdk/src/api/entities/VCLJwt";
import VCLJwtVerifyService from "@velocitycareerlabs/vnf-nodejs-wallet-sdk/src/api/jwt/VCLJwtVerifyService";

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
        const init = await vcl.initialize(
            new VCLInitializationDescriptor(
                VCLEnvironment.DEV,
                new VCLCryptoServicesDescriptor(
                    new VCLKeyServiceEmptyImpl(),
                    new VCLJwtSignServiceEmptyImpl(),
                    new VCLJwtVerifyServiceEmptyImpl()
                )
            )
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

        const afghanistanCountry = vcl.countriesModel.data.countryByCode(
            VCLCountries.AF
        )!;
        const afghanistanRegions = afghanistanCountry.regions;

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

class VCLKeyServiceEmptyImpl implements VCLKeyService {
    generateDidJwk(
        didJwkDescriptor: VCLDidJwkDescriptor
    ): Promise<VCLResult<VCLDidJwk>> {
        return new Promise<VCLResult<VCLDidJwk>>((resolve, reject) => {
            resolve(new VCLResult<VCLDidJwk>());
        });
    }
}

class VCLJwtSignServiceEmptyImpl implements VCLJwtSignService {
    sign(
        jwtDescriptor: VCLJwtDescriptor,
        didJwk: VCLDidJwk,
        nonce: string | null | undefined
    ): Promise<VCLResult<VCLJwt>> {
        return new Promise<VCLResult<VCLJwt>>((resolve, reject) => {
            resolve(new VCLResult<VCLJwt>());
        });
    }
}

class VCLJwtVerifyServiceEmptyImpl implements VCLJwtVerifyService {
    verify(jwt: VCLJwt, publicJwk: VCLPublicJwk): Promise<VCLResult<boolean>> {
        return new Promise<VCLResult<boolean>>((resolve, reject) => {
            resolve(new VCLResult<boolean>());
        });
    }
}
