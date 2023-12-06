import VCLJwt, { SignedJWT } from "../../api/entities/VCLJwt";
import "../../impl/extensions/StringExtensions";

    let subject: VCLJwt
    const jwtWtithKidStr = 
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InNvbWVfa2lkIn0.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.lGqyFj2RpmostxLvCcMFym9kWM0bzQcty9a81EdzrhM"
    const jwtWtihJwkStr = 
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImp3ayI6eyJrdHkiOiJSU0EiLCJ1c2UiOiJzaWciLCJraWQiOiJzb21lX2tpZCIsIm4iOiJ6ZzctOGFZcnh1VjdINHQuLi4iLCJlIjoiQVFBQiJ9fQ.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.ijeuQTlhK7jpYkRmD_yWFKtluFWLEhjdieZJxkTc9fY"

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

        test("valid jwt with kid", async () => {
            subject = VCLJwt.fromEncodedJwt(jwtWtithKidStr)

            expect(JSON.stringify(subject.header) == "{\"alg\":\"HS256\",\"typ\":\"JWT\",\"kid\":\"some_kid\"}").toBeTruthy()
            expect(JSON.stringify(subject.payload) == "{\"sub\":\"1234567890\",\"name\":\"John Doe\",\"iat\":1516239022}").toBeTruthy()
            expect(subject.signature == "lGqyFj2RpmostxLvCcMFym9kWM0bzQcty9a81EdzrhM").toBeTruthy()
            expect(subject.encodedJwt == jwtWtithKidStr).toBeTruthy()
            expect(JSON.stringify(subject.jwk) == "{}").toBeTruthy()
            expect(subject.kid == "some_kid").toBeTruthy()
        })

        test("valid jwt with jwk", async () => {
            subject = VCLJwt.fromEncodedJwt(jwtWtihJwkStr)

            expect(JSON.stringify(subject.header) == 
            "{\"alg\":\"HS256\",\"typ\":\"JWT\",\"jwk\":{\"kty\":\"RSA\",\"use\":\"sig\",\"kid\":\"some_kid\",\"n\":\"zg7-8aYrxuV7H4t...\",\"e\":\"AQAB\"}}"
            ).toBeTruthy()
            expect(JSON.stringify(subject.payload) == "{\"sub\":\"1234567890\",\"name\":\"John Doe\",\"iat\":1516239022}").toBeTruthy()
            expect(subject.signature == "ijeuQTlhK7jpYkRmD_yWFKtluFWLEhjdieZJxkTc9fY").toBeTruthy()
            expect(subject.encodedJwt == jwtWtihJwkStr).toBeTruthy()
            expect(JSON.stringify(subject.jwk) == "{\"kty\":\"RSA\",\"use\":\"sig\",\"kid\":\"some_kid\",\"n\":\"zg7-8aYrxuV7H4t...\",\"e\":\"AQAB\"}").toBeTruthy()
            expect(subject.kid == "some_kid").toBeTruthy()
        })
    })
