import { VCLDidJwk, VCLPublicJwk } from "../../../../src";

class DidJwkMocks {
    static readonly DidJwk = new VCLDidJwk(
        "did:jwk:eyJrdHkiOiJFQyIsInVzZSI6InNpZyIsImNydiI6InNlY3AyNTZrMSIsImtpZCI6IjNkODdhZGFmLWQ0ZmEtNDBkZS1iNGYzLTExNGFhOGZmOTMyOCIsIngiOiJvZThGN1ZPWmtOZGpnUTNLdHVmenlwRjBkTWh2QjZVanpYQVRVQ1d2NlRjIiwieSI6IjRQNFZJRFJtYWM2ZlJFY0hkR2tDdVRqdDJMSnNoYVZ2WWpjMGVVZEdpaHcifQ",
        VCLPublicJwk.fromString("{\"kty\":\"EC\",\"use\":\"sig\",\"crv\":\"secp256k1\",\"kid\":\"3d87adaf-d4fa-40de-b4f3-114aa8ff9328\",\"x\":\"oe8F7VOZkNdjgQ3KtufzypF0dMhvB6UjzXATUCWv6Tc\",\"y\":\"4P4VIDRmac6fREcHdGkCuTjt2LJshaVvYjc0eUdGihw\"}"),
        "did:jwk:eyJrdHkiOiJFQyIsInVzZSI6InNpZyIsImNydiI6InNlY3AyNTZrMSIsImtpZCI6IjNkODdhZGFmLWQ0ZmEtNDBkZS1iNGYzLTExNGFhOGZmOTMyOCIsIngiOiJvZThGN1ZPWmtOZGpnUTNLdHVmenlwRjBkTWh2QjZVanpYQVRVQ1d2NlRjIiwieSI6IjRQNFZJRFJtYWM2ZlJFY0hkR2tDdVRqdDJMSnNoYVZ2WWpjMGVVZEdpaHcifQ#0",
        "3d87adaf-d4fa-40de-b4f3-114aa8ff9328"
    )
}

export { DidJwkMocks }