import { VCLDidJwk, VCLDidJwkDescriptor, VCLKeyService } from "@velocitycareerlabs/vnf-nodejs-wallet-sdk/src";
import { DidJwkMocks } from "../DidJwkMocks";

export class KeyServiceMock implements VCLKeyService {
    // eslint-disable-next-line unused-imports/no-unused-vars,no-unused-vars
    async generateDidJwk(didJwkDescriptor: VCLDidJwkDescriptor): Promise<VCLDidJwk> {
        return DidJwkMocks.DidJwk
    }
}