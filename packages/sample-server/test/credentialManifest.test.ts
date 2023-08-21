"use strict";
import { describe, expect, test, beforeAll, afterAll } from "@jest/globals";
import app from "../src/app";
import { FastifyInstance } from "fastify";

import { VCLImpl } from "vnf-wallet-sdk-nodejs/dist/impl/VCLImpl";
import VCLInitializationDescriptor from "vnf-wallet-sdk-nodejs/dist/api/entities/VCLInitializationDescriptor";
import VCLCountries from "vnf-wallet-sdk-nodejs/dist/api/entities/VCLCountries";
import VCLEnvironment from "vnf-wallet-sdk-nodejs/dist/api/VCLEnvironment";
import CredentialManifestUseCaseImpl from "vnf-wallet-sdk-nodejs/dist/impl/data/usecases/CredentialManifestUseCaseImpl";
import NetworkServiceSuccess from "vnf-wallet-sdk-nodejs/dist/test/NetworkServiceSuccess";
import CredentialManifestRepositoryImpl from "vnf-wallet-sdk-nodejs/dist/impl/data/repositories/CredentialManifestRepositoryImpl";
import ResolveKidRepositoryImpl from "vnf-wallet-sdk-nodejs/dist/impl/data/repositories/ResolveKidRepositoryImpl";
import JwtServiceRepositoryImpl from "vnf-wallet-sdk-nodejs/dist/impl/data/repositories/JwtServiceRepositoryImpl";
import JwtServiceImpl from "vnf-wallet-sdk-nodejs/dist/impl/data/infrastructure/jwt/JwtServiceImpl";
import VCLCredentialManifestDescriptorByService from "vnf-wallet-sdk-nodejs/dist/api/entities/VCLCredentialManifestDescriptorByService";
import VCLIssuingType from "vnf-wallet-sdk-nodejs/dist/api/entities/VCLIssuingType";
import VCLOrganizationsSearchDescriptor from "vnf-wallet-sdk-nodejs/dist/api/entities/VCLOrganizationsSearchDescriptor";
import VCLDeepLink from "vnf-wallet-sdk-nodejs/src/api/entities/VCLDeepLink";

describe("initalization flow", () => {
    let appInstance: FastifyInstance;
    const CredentialManifestEncodedJwt =
        '{"issuing_request":"eyJ0eXAiOiJKV1QiLCJraWQiOiJkaWQ6dmVsb2NpdHk6MHhkNGRmMjk3MjZkNTAwZjliODViYzZjN2YxYjNjMDIxZjE2MzA1NjkyI2tleS0xIiwiYWxnIjoiRVMyNTZLIn0.eyJleGNoYW5nZV9pZCI6IjYwZjQ3ZTMwNDRkNWIwMDAwYTA2YjU0NCIsIm91dHB1dF9kZXNjcmlwdG9ycyI6W3siaWQiOiIob2Zmc2V0OiAwIiwic2NoZW1hIjpbeyJ1cmkiOiIob2Zmc2V0OiAwIn1dfSx7ImlkIjoiIGVsZW1lbnQ6IFwiUGFzdEVtcGxveW1lbnRQb3NpdGlvblwiKSIsInNjaGVtYSI6W3sidXJpIjoiIGVsZW1lbnQ6IFwiUGFzdEVtcGxveW1lbnRQb3NpdGlvblwiKSJ9XX0seyJpZCI6IihvZmZzZXQ6IDEiLCJzY2hlbWEiOlt7InVyaSI6IihvZmZzZXQ6IDEifV19LHsiaWQiOiIgZWxlbWVudDogXCJDdXJyZW50RW1wbG95bWVudFBvc2l0aW9uXCIpIiwic2NoZW1hIjpbeyJ1cmkiOiIgZWxlbWVudDogXCJDdXJyZW50RW1wbG95bWVudFBvc2l0aW9uXCIpIn1dfV0sImlzc3VlciI6eyJpZCI6ImRpZDp2ZWxvY2l0eToweGQ0ZGYyOTcyNmQ1MDBmOWI4NWJjNmM3ZjFiM2MwMjFmMTYzMDU2OTIifSwicHJlc2VudGF0aW9uX2RlZmluaXRpb24iOnsiaWQiOiI2MGY0N2UzMDQ0ZDViMDAwMGEwNmI1NDQuNjBlODBkZjkwZjliOGUwMDFjNjhmYzMzIiwicHVycG9zZSI6IkNyZWRlbnRpYWwgSXNzdWFuY2UiLCJmb3JtYXQiOnsiand0X3ZwIjp7ImFsZyI6WyJzZWNwMjU2azEiXX19LCJpbnB1dF9kZXNjcmlwdG9ycyI6W3siaWQiOiJQaG9uZSIsInNjaGVtYSI6W3sidXJpIjoiaHR0cHM6Ly9kZXZzZXJ2aWNlcy52ZWxvY2l0eWNhcmVlcmxhYnMuaW8vYXBpL3YwLjYvc2NoZW1hcy9waG9uZS5zY2hlbWEuanNvbiJ9XX0seyJpZCI6IkVtYWlsIiwic2NoZW1hIjpbeyJ1cmkiOiJodHRwczovL2RldnNlcnZpY2VzLnZlbG9jaXR5Y2FyZWVybGFicy5pby9hcGkvdjAuNi9zY2hlbWFzL2VtYWlsLnNjaGVtYS5qc29uIn1dfSx7ImlkIjoiSWREb2N1bWVudCIsInNjaGVtYSI6W3sidXJpIjoiaHR0cHM6Ly9kZXZzZXJ2aWNlcy52ZWxvY2l0eWNhcmVlcmxhYnMuaW8vYXBpL3YwLjYvc2NoZW1hcy9pZC1kb2N1bWVudC52MS5zY2hlbWEuanNvbiJ9XX1dfSwiaXNzIjoiZGlkOnZlbG9jaXR5OjB4ZDRkZjI5NzI2ZDUwMGY5Yjg1YmM2YzdmMWIzYzAyMWYxNjMwNTY5MiIsImlhdCI6MTYyNjYzNTgyNCwiZXhwIjoxNjI3MjQwNjI0LCJuYmYiOjE2MjY2MzU4MjR9.P_CVH35Hok4zpSnmd7ew2Si-99MoRuFo9AxeUFaEJHcv_lqfEu3q5Ow4z2N6C4r1F-q8EJIQwpGeg9ZACL3t8g"}';
    const JWK =
        '{"alg":"ES256K","use":"sig","kid":"uemn6l5ro6hLNrgiPRl1Dy51V9whez4tu4hlwsNOTVk","crv":"secp256k1","x":"oLYCa-AlnVpW8Rq9iST_1eY_XoyvGRry7y1xS4vU4qo","y":"PUMAsawZ24WaSnRIdDb_wNbShAvfsGF71ke1DcJGxlM","kty":"EC"}\n';

    let vcl = new VCLImpl();

    let subject = new CredentialManifestUseCaseImpl(
        new CredentialManifestRepositoryImpl(
            new NetworkServiceSuccess(CredentialManifestEncodedJwt)
        ),
        new ResolveKidRepositoryImpl(new NetworkServiceSuccess(JWK)),
        new JwtServiceRepositoryImpl(new JwtServiceImpl())
    );
    beforeAll(async () => {
        appInstance = await app({ logger: true });
    });

    afterAll(async () => {
        await appInstance.close();
    });

    test("Search Organizations", async () => {
        vcl.searchForOrganizations(new VCLOrganizationsSearchDescriptor());
    });
});
