"use strict";
import { describe, expect, test, beforeAll, afterAll } from "@jest/globals";
import app from "../src/app";
import { FastifyInstance } from "fastify";

import { VCLImpl } from "vnf-wallet-sdk-nodejs/dist/impl/VCLImpl";
import VCLInitializationDescriptor from "vnf-wallet-sdk-nodejs/dist/api/entities/VCLInitializationDescriptor";
import VCLEnvironment from "vnf-wallet-sdk-nodejs/dist/api/VCLEnvironment";
import JwtServiceUseCaseImpl from "vnf-wallet-sdk-nodejs/dist/impl/data/usecases/JwtServiceUseCaseImpl";
import JwtServiceRepositoryImpl from "vnf-wallet-sdk-nodejs/dist/impl/data/repositories/JwtServiceRepositoryImpl";
import JwtServiceImpl from "vnf-wallet-sdk-nodejs/dist/impl/data/infrastructure/jwt/JwtServiceImpl";
import VCLResult from "vnf-wallet-sdk-nodejs/dist/api/entities/VCLResult";
import VCLJwt from "vnf-wallet-sdk-nodejs/dist/api/entities/VCLJwt";
import VCLJwkPublic from "vnf-wallet-sdk-nodejs/dist/api/entities/VCLJwkPublic";
import VCLJwtDescriptor from "vnf-wallet-sdk-nodejs/dist/api/entities/VCLJwtDescriptor";
import VCLDidJwk from "vnf-wallet-sdk-nodejs/dist/api/entities/VCLDidJwk";

describe("jwt and jwk", () => {
    let appInstance: FastifyInstance;
    let vcl = new VCLImpl();
    beforeAll(async () => {
        appInstance = await app({ logger: true });
    });

    afterAll(async () => {
        await appInstance.close();
    });

    test("Generate Signed JWT", async () => {
        let service = new JwtServiceUseCaseImpl(
            new JwtServiceRepositoryImpl(new JwtServiceImpl())
        );

        let iss = "some iss";
        let jti = "some jti";

        const jsonObjectStr =
            '{"authority":{"name":{"ui.title":"Issued by"},"identifer":{"ui.widget":"hidden"},"place":{"name":{"ui.widget":"hidden"},"addressCountry":{"ui.title":"Country","ui:enum":["TARGET_COUNTRIES_ENUM"],"ui:widget":"select"},"addressRegion":{"ui:widget":"hidden"},"addressLocality":{"ui.widget":"hidden"}},"ui:order":["name","place"]},"identifier":{"ui.title":"Permit number"},"validity":{"firstValidFrom":{"ui.title":"Date issued","ui:widget":"date"},"validFrom":{"ui.title":"Date renewed","ui:widget":"date"},"validUntil":{"ui.title":"Valid until","ui:widget":"date"},"validIn":{"ui.widget":"hidden"},"ui:order":["firstValidFrom","validFrom","validUntil"]},"person":{"givenName":{"ui.title":"Given Name"},"additionalName":{"ui.title":"Middle name"},"familyName":{"ui.title":"Family name"},"namePrefix":{"ui.title":"Name prefix"},"nameSuffix":{"ui.title":"Name suffix"},"birthDate":{"ui.title":"Birth date","ui:widget":"date"},"birthPlace":{"name":{"ui.widget":"hidden"},"addressCountry":{"ui.title":"Country of birth","ui:enum":["TARGET_COUNTRIES_ENUM"],"ui:widget":"select"},"addressRegion":{"ui.title":"Region or state of birth","ui:enum":["TARGET_REGIONS_ENUM"],"ui:widget":"select"},"addressLocality":{"ui.title":"Place of birth"},"ui:order":["addressCountry","addressRegion","addressLocality"]},"gender":{"ui.title":"Gender"},"ui:order":["givenName","additionalName","familyName","namePrefix","nameSuffix","birthDate","birthPlace","gender"]},"nationality":{"ui.title":"Nationality"},"address":{"addressCountry":{"ui.title":"Address country","ui:enum":["TARGET_COUNTRIES_ENUM"],"ui:widget":"select"},"addressRegion":{"ui.title":"Address region or state","ui:enum":["TARGET_REGIONS_ENUM"],"ui:widget":"select"},"addressLocality":{"ui.title":"Address locality"},"streetAddress":{"ui.title":"Street address"},"postCode":{"ui.title":"Post code"},"ui:order":["addressCountry","addressRegion","addressLocality","streetAddress","postCode"]},"ui:order":["authority","identifier","validity","person","nationality","address"]}';

        const jsonObject = JSON.parse(jsonObjectStr);

        var resultJwt: VCLResult<VCLJwt> | null =
            await service.generateSignedJwt(
                new VCLJwtDescriptor(jsonObject, iss, jti)
            );

        const jwtJson = resultJwt?.getData()!;
        expect(jwtJson.payload["iss"] == iss).toBeTruthy();
        expect(jwtJson.payload["jti"] == jti).toBeTruthy();
    });

    test("Sign Verify", async () => {
        const jwtJson = JSON.parse(
            '{"authority":{"name":{"ui.title":"Issued by"},"identifer":{"ui.widget":"hidden"},"place":{"name":{"ui.widget":"hidden"},"addressCountry":{"ui.title":"Country","ui:enum":["TARGET_COUNTRIES_ENUM"],"ui:widget":"select"},"addressRegion":{"ui:widget":"hidden"},"addressLocality":{"ui.widget":"hidden"}},"ui:order":["name","place"]},"identifier":{"ui.title":"Permit number"},"validity":{"firstValidFrom":{"ui.title":"Date issued","ui:widget":"date"},"validFrom":{"ui.title":"Date renewed","ui:widget":"date"},"validUntil":{"ui.title":"Valid until","ui:widget":"date"},"validIn":{"ui.widget":"hidden"},"ui:order":["firstValidFrom","validFrom","validUntil"]},"person":{"givenName":{"ui.title":"Given Name"},"additionalName":{"ui.title":"Middle name"},"familyName":{"ui.title":"Family name"},"namePrefix":{"ui.title":"Name prefix"},"nameSuffix":{"ui.title":"Name suffix"},"birthDate":{"ui.title":"Birth date","ui:widget":"date"},"birthPlace":{"name":{"ui.widget":"hidden"},"addressCountry":{"ui.title":"Country of birth","ui:enum":["TARGET_COUNTRIES_ENUM"],"ui:widget":"select"},"addressRegion":{"ui.title":"Region or state of birth","ui:enum":["TARGET_REGIONS_ENUM"],"ui:widget":"select"},"addressLocality":{"ui.title":"Place of birth"},"ui:order":["addressCountry","addressRegion","addressLocality"]},"gender":{"ui.title":"Gender"},"ui:order":["givenName","additionalName","familyName","namePrefix","nameSuffix","birthDate","birthPlace","gender"]},"nationality":{"ui.title":"Nationality"},"address":{"addressCountry":{"ui.title":"Address country","ui:enum":["TARGET_COUNTRIES_ENUM"],"ui:widget":"select"},"addressRegion":{"ui.title":"Address region or state","ui:enum":["TARGET_REGIONS_ENUM"],"ui:widget":"select"},"addressLocality":{"ui.title":"Address locality"},"streetAddress":{"ui.title":"Street address"},"postCode":{"ui.title":"Post code"},"ui:order":["addressCountry","addressRegion","addressLocality","streetAddress","postCode"]},"ui:order":["authority","identifier","validity","person","nationality","address"]}'
        );
        let service = new JwtServiceUseCaseImpl(
            new JwtServiceRepositoryImpl(new JwtServiceImpl())
        );

        let resultJwt = await service.generateSignedJwt(
            new VCLJwtDescriptor(jwtJson, "", "")
        );

        let resultVerified = await service.verifyJwt(
            resultJwt.data,
            new VCLJwkPublic(JSON.stringify(resultJwt.data.header.jwk))
        );

        expect(resultVerified.data).toBeTruthy();
    });

    test("Generate DidJwk", async () => {
        let service = new JwtServiceUseCaseImpl(
            new JwtServiceRepositoryImpl(new JwtServiceImpl())
        );

        let raw = await service.generateDidJwk();
        let didJwk: string = raw.data.value;
        expect(didJwk.startsWith(VCLDidJwk.DidJwkPrefix)).toBeTruthy();
        expect(didJwk.split(VCLDidJwk.DidJwkPrefix)[1].length > 0).toBeTruthy();
    });
});
