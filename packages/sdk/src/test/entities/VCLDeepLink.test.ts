import VCLDeepLink from "../../api/entities/VCLDeepLink";
import { DeepLinkMocks } from "../infrastructure/resources/DeepLinkMocks";
import { isEquivalentUris } from '../utils';
import "../../impl/extensions/StringExtensions";


describe("deep link aggregation tests", () => {

    let subject: VCLDeepLink;      

    test("open id initiate issuance", async () => {
        subject = new VCLDeepLink(DeepLinkMocks.OpenidInitiateIssuanceStrDev)

        expect(subject.value == DeepLinkMocks.OpenidInitiateIssuanceStrDev).toBeTruthy()
        expect(decodeURI(subject.value) == decodeURI(DeepLinkMocks.OpenidInitiateIssuanceStrDev)).toBeTruthy()
        expect(subject.requestUri == null).toBeTruthy()
        // expect(subject.did == DeepLinkMocks.OIDIssuerDid).toBeTruthy()
    })

    test("presentation request deep link devnet valid aggregation", async () => {
        subject = new VCLDeepLink(DeepLinkMocks.PresentationRequestDeepLinkDevNetStr)

        expect(subject.value == DeepLinkMocks.PresentationRequestDeepLinkDevNetStr)
        expect(decodeURI(subject.value)).toEqual(decodeURI(DeepLinkMocks.PresentationRequestDeepLinkDevNetStr))
        expect(
            isEquivalentUris(subject.requestUri ?? '', DeepLinkMocks.PresentationRequestRequestDecodedUriStr)
        ).toBeTruthy()
        expect(subject.vendorOriginContext).toEqual(DeepLinkMocks.PresentationRequestVendorOriginContext)
        expect(subject.did).toEqual(DeepLinkMocks.InspectorDid)
    })

    test("presentation request deep link testnet valid aggregation", async () => {
        subject = new VCLDeepLink(DeepLinkMocks.PresentationRequestDeepLinkTestNetStr)

        expect(subject.value).toEqual(DeepLinkMocks.PresentationRequestDeepLinkTestNetStr)
        expect(decodeURI(subject.value)).toEqual(decodeURI(DeepLinkMocks.PresentationRequestDeepLinkTestNetStr))
        expect(
            isEquivalentUris(subject.requestUri ?? '', DeepLinkMocks.PresentationRequestRequestDecodedUriStr)
        ).toBeTruthy()
        expect(subject.vendorOriginContext == DeepLinkMocks.PresentationRequestVendorOriginContext)
        expect(subject.did == DeepLinkMocks.InspectorDid)
    })

    test("presentation request deep link main net valid aggregation", async () => {
        subject = new VCLDeepLink(DeepLinkMocks.PresentationRequestDeepLinkMainNetStr)

        expect(subject.value).toEqual(DeepLinkMocks.PresentationRequestDeepLinkMainNetStr)
        expect(decodeURI(subject.value)).toEqual(decodeURI(DeepLinkMocks.PresentationRequestDeepLinkMainNetStr))
        expect(
            isEquivalentUris(subject.requestUri ?? '', DeepLinkMocks.PresentationRequestRequestDecodedUriStr)
        ).toBeTruthy()
        expect(subject.vendorOriginContext == DeepLinkMocks.PresentationRequestVendorOriginContext)
        expect(subject.did == DeepLinkMocks.InspectorDid)
    })

    test("credential manifest deep link dev net valid aggregation", async () => {
        subject = new VCLDeepLink(DeepLinkMocks.CredentialManifestDeepLinkDevNetStr)

        expect(subject.value).toEqual(DeepLinkMocks.CredentialManifestDeepLinkDevNetStr)
        expect(decodeURI(subject.value)).toEqual(decodeURI(DeepLinkMocks.CredentialManifestDeepLinkDevNetStr))
        expect(
            isEquivalentUris(subject.requestUri ?? '', DeepLinkMocks.CredentialManifestRequestDecodedUriStr)
        ).toBeTruthy()
        expect(subject.vendorOriginContext == null)
        expect(subject.did == DeepLinkMocks.IssuerDid)
    })

    test("credential manifest deep link test net valid aggregation", async () => {
        subject = new VCLDeepLink(DeepLinkMocks.CredentialManifestDeepLinkTestNetStr)

        expect(subject.value).toEqual(DeepLinkMocks.CredentialManifestDeepLinkTestNetStr)
        expect(decodeURI(subject.value)).toEqual(decodeURI(DeepLinkMocks.CredentialManifestDeepLinkTestNetStr))
        expect(
            isEquivalentUris(subject.requestUri ?? '', DeepLinkMocks.CredentialManifestRequestDecodedUriStr)
        ).toBeTruthy()
        expect(subject.vendorOriginContext == null)
        expect(subject.did == DeepLinkMocks.IssuerDid)
    })

    test("credential manifest deep link main net valid aggregation", async () => {
        subject = new VCLDeepLink(DeepLinkMocks.CredentialManifestDeepLinkMainNetStr)

        expect(subject.value).toEqual(DeepLinkMocks.CredentialManifestDeepLinkMainNetStr)
        expect(decodeURI(subject.value)).toEqual(decodeURI(DeepLinkMocks.CredentialManifestDeepLinkMainNetStr))
        expect(
            isEquivalentUris(subject.requestUri ?? '', DeepLinkMocks.CredentialManifestRequestDecodedUriStr)
        ).toBeTruthy()
        expect(subject.vendorOriginContext == null)
        expect(subject.did == DeepLinkMocks.IssuerDid)
    })
})
