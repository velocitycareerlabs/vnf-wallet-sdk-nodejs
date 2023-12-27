import VCLPublicJwk from "../../src/api/entities/VCLPublicJwk";
import { JwtServiceMocks } from "../infrastructure/resources/valid/JwtServiceMocks";

describe("VCLPublicJwk Tests", () => {
    let subject: VCLPublicJwk;
    const jwkJson = JSON.parse(JwtServiceMocks.JWK);

    test("testJwkPublicFromStr", () => {
        subject = VCLPublicJwk.fromString(JwtServiceMocks.JWK);

        expect(subject.valueStr).toBe(JwtServiceMocks.JWK);
    });

    test("testJwkPublicFromJson", () => {
        subject = VCLPublicJwk.fromJSON(jwkJson);

        expect(subject.valueJson).toEqual(jwkJson);
    });
});
