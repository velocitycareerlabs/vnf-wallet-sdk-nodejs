import NetworkServiceSuccess from "../NetworkServiceSuccess";
import { VCLOrganizationsSearchDescriptor, VCLService } from "../../src";
import OrganizationsUseCaseImpl from "../../src/impl/data/usecases/OrganizationsUseCaseImpl";
import OrganizationsRepositoryImpl from "../../src/impl/data/repositories/OrganizationsRepositoryImpl";
import { OrganizationsMocks } from "../infrastructure/resources/valid/OrganizationsMocks";

describe("OrganizationsUseCase Tests", () => {
    const subject = new OrganizationsUseCaseImpl(
        new OrganizationsRepositoryImpl(
            new NetworkServiceSuccess(JSON.parse(OrganizationsMocks.OrganizationJsonResultStr)),
        )
    )

    test("testSearchForOrganizationsSuccess", async () => {
        const serviceJsonMock = JSON.parse(OrganizationsMocks.ServiceJsonStr)

        const orgs = await subject.searchForOrganizations(
            new VCLOrganizationsSearchDescriptor(null, null, null, "")
        )
        const serviceCredentialAgentIssuer = orgs.all[0].serviceCredentialAgentIssuers[0]
        expect(serviceCredentialAgentIssuer.payload).toStrictEqual(serviceJsonMock)
        expect(serviceCredentialAgentIssuer.id).toBe(serviceJsonMock[VCLService.KeyId])
        expect(serviceCredentialAgentIssuer.type).toBe(serviceJsonMock[VCLService.KeyType])
        expect(
            serviceCredentialAgentIssuer.credentialTypes).toStrictEqual(serviceJsonMock[VCLService.KeyCredentialTypes]
        )
        expect(serviceCredentialAgentIssuer.serviceEndpoint).toBe(OrganizationsMocks.ServiceEndpoint)
    })

});

