import VCLJwt, { SignedJWT } from "../../api/entities/VCLJwt";
import "../../impl/extensions/StringExtensions";
import assert from "assert"

    var subject: VCLJwt
    let jwtStr = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InNvbWVfa2lkIn0.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.lGqyFj2RpmostxLvCcMFym9kWM0bzQcty9a81EdzrhM"

    describe("test jwt", () => {

        test("empty jwt", async () => {
            subject = VCLJwt.fromEncodedJwt("")
            
            expect(JSON.stringify(subject.header) == "{}").toBeTruthy()
            expect(JSON.stringify(subject.payload) == "{}").toBeTruthy()
            expect(subject.signature == "").toBeTruthy()
            expect(subject.encodedJwt == "").toBeTruthy()
            expect(JSON.stringify(subject.jwk) == "{}").toBeTruthy()
            expect(subject.kid == "").toBeTruthy()
        })

        test("valid jwt", async () => {
            subject = VCLJwt.fromEncodedJwt(jwtStr)

            expect(JSON.stringify(subject.header) == "{\"alg\":\"HS256\",\"typ\":\"JWT\",\"kid\":\"some_kid\"}").toBeTruthy()
            expect(JSON.stringify(subject.payload) == "{\"sub\":\"1234567890\",\"name\":\"John Doe\",\"iat\":1516239022}").toBeTruthy()
            expect(subject.signature == "lGqyFj2RpmostxLvCcMFym9kWM0bzQcty9a81EdzrhM").toBeTruthy()
            expect(subject.encodedJwt == jwtStr).toBeTruthy()
            expect(JSON.stringify(subject.jwk) == "{}").toBeTruthy()
            expect(subject.kid == "some_kid").toBeTruthy()
        })

    })
