import VCLPublicJwk from "../../src/api/entities/VCLPublicJwk";
import { JwtServiceMocks } from "../infrastructure/resources/valid/JwtServiceMocks";

describe("VCLPublicJwk Tests", () => {
    let subject: VCLPublicJwk;
    const jwkJson = JSON.parse(JwtServiceMocks.JWK);

    test("testPublicJwkFromStr", () => {
        subject = VCLPublicJwk.fromString(JwtServiceMocks.JWK);

        expect(subject.valueStr).toBe(JwtServiceMocks.JWK);
    });

    test("testPublicJwkFromJson", () => {
        subject = VCLPublicJwk.fromJSON(jwkJson);

        expect(subject.valueJson).toEqual(jwkJson);
    });
});
