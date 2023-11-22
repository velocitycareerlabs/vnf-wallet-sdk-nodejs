import VCLDeepLink from "@velocitycareerlabs/vnf-nodejs-wallet-sdk/src/api/entities/VCLDeepLink"

export abstract class DeepLinkMocks {
    static readonly DevNetProtocol = "velocity-network-devnet"
    static readonly TestNetProtocol = "velocity-network-testnet"
    static readonly MainNetProtocol = "velocity-network"

    static readonly OIDIssuerDid = "did:velocity:0xc257274276a4e539741ca11b590b9447b26a8051"

    static readonly Issuer =
    "https%3A%2F%2Fdevagent.velocitycareerlabs.io%2Fapi%2Fholder%2Fv0.6%2Forg%2Fdid%3Avelocity%3A0xc257274276a4e539741ca11b590b9447b26a8051%2Foidc%3Fcredential_type%3DPastEmploymentPosition%26pre-authorized_code%3D8L1UArquTYvE-ylC2BV_2%26issuerDid%3Ddid%3Avelocity%3A0xc257274276a4e539741ca11b590b9447b26a8051"

    static readonly OpenidInitiateIssuanceStrDev = `openid-initiate-issuance://?issuer=${DeepLinkMocks.Issuer}`

    static readonly InspectorDid = "did:ion:EiByBvq95tfmhl41DOxJeaa26HjSxAUoz908PITFwMRDNA"

    static readonly PresentationRequestVendorOriginContext =
    "{\"SubjectKey\":{\"BusinessUnit\":\"ZC\",\"KeyCode\":\"54514480\"},\"Token\":\"832077a4\"}"

    static readonly PresentationRequestRequestDecodedUriStr = decodeURI(
    `https://agent.velocitycareerlabs.io/api/holder/v0.6/org/${DeepLinkMocks.InspectorDid}/inspect/get-presentation-request?id=62e0e80c5ebfe73230b0becc&inspectorDid=${decodeURI(DeepLinkMocks.InspectorDid)}&vendorOriginContext=%7B%22SubjectKey%22%3A%7B%22BusinessUnit%22%3A%22ZC%22,%22KeyCode%22%3A%2254514480%22%7D,%22Token%22%3A%22832077a4%22%7D`
    )

    static readonly PresentationRequestRequestUriStr =
    `https%3A%2F%2Fagent.velocitycareerlabs.io%2Fapi%2Fholder%2Fv0.6%2Forg%2F${DeepLinkMocks.InspectorDid}%2Finspect%2Fget-presentation-request%3Fid%3D62e0e80c5ebfe73230b0becc&inspectorDid=${DeepLinkMocks.InspectorDid}&vendorOriginContext=%7B%22SubjectKey%22%3A%7B%22BusinessUnit%22%3A%22ZC%22,%22KeyCode%22%3A%2254514480%22%7D,%22Token%22%3A%22832077a4%22%7D`

    static readonly PresentationRequestDeepLinkDevNetStr =
    `${DeepLinkMocks.DevNetProtocol}://inspect?request_uri=${DeepLinkMocks.PresentationRequestRequestUriStr}`
    static readonly PresentationRequestDeepLinkTestNetStr =
    `${DeepLinkMocks.TestNetProtocol}://inspect?request_uri=${DeepLinkMocks.PresentationRequestRequestUriStr}`
    static readonly PresentationRequestDeepLinkMainNetStr =
    `${DeepLinkMocks.MainNetProtocol}://inspect?request_uri=${DeepLinkMocks.PresentationRequestRequestUriStr}`

    static readonly IssuerDid = "did:velocity:0xd4df29726d500f9b85bc6c7f1b3c021f16305692"

    static readonly CredentialManifestRequestDecodedUriStr =
    `https://devagent.velocitycareerlabs.io/api/holder/v0.6/org/${DeepLinkMocks.IssuerDid}/issue/get-credential-manifest?id=611b5836e93d08000af6f1bc&credential_types=PastEmploymentPosition&issuerDid=did:velocity:0xd4df29726d500f9b85bc6c7f1b3c021f16305692`

    static readonly CredentialManifestRequestUriStr =
    `https%3A%2F%2Fdevagent.velocitycareerlabs.io%2Fapi%2Fholder%2Fv0.6%2Forg%2Fdid%3Avelocity%3A0xd4df29726d500f9b85bc6c7f1b3c021f16305692%2Fissue%2Fget-credential-manifest%3Fid%3D611b5836e93d08000af6f1bc%26credential_types%3DPastEmploymentPosition%26issuerDid%3Ddid%3Avelocity%3A0xd4df29726d500f9b85bc6c7f1b3c021f16305692`

    static readonly CredentialManifestDeepLinkDevNetStr = `${DeepLinkMocks.DevNetProtocol}://issue?request_uri=${DeepLinkMocks.CredentialManifestRequestUriStr}`
    static readonly CredentialManifestDeepLinkTestNetStr = `${DeepLinkMocks.TestNetProtocol}://issue?request_uri=${DeepLinkMocks.CredentialManifestRequestUriStr}`
    static readonly CredentialManifestDeepLinkMainNetStr = `${DeepLinkMocks.MainNetProtocol}://issue?request_uri=${DeepLinkMocks.CredentialManifestRequestUriStr}`

    static readonly CredentialManifestDeepLinkDevNet = new VCLDeepLink(DeepLinkMocks.CredentialManifestDeepLinkDevNetStr)
    static readonly CredentialManifestDeepLinkTestNet = new VCLDeepLink(DeepLinkMocks. CredentialManifestDeepLinkTestNetStr)
    static readonly CredentialManifestDeepLinkMainNet = new VCLDeepLink(DeepLinkMocks.CredentialManifestDeepLinkMainNetStr)
    
    static readonly PresentationRequestDeepLinkDevNet = new VCLDeepLink(DeepLinkMocks.PresentationRequestDeepLinkDevNetStr)
}