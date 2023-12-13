import VCLJwkPublic from "../../src/api/entities/VCLJwkPublic";
import { JwtServiceMocks } from "../infrastructure/resources/valid/JwtServiceMocks";

describe("VCLJwkPublic Tests", () => {
    let subject: VCLJwkPublic;
    const jwkJson = JSON.parse(JwtServiceMocks.JWK);

    test("testJwkPublicFromStr", () => {
        subject = VCLJwkPublic.fromString(JwtServiceMocks.JWK);

        expect(subject.valueStr).toBe(JwtServiceMocks.JWK);
    });

    test("testJwkPublicFromJson", () => {
        subject = VCLJwkPublic.fromJSON(jwkJson);

        expect(subject.valueJson).toEqual(jwkJson);
    });
});
