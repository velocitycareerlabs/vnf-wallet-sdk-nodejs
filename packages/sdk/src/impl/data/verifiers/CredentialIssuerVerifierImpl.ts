/**
 * Created by Michael Avoyan on 03/06/2024.
 *
 * Copyright 2022 Velocity Career Labs inc.
 * SPDX-License-Identifier: Apache-2.0
 */
import VCLJwt from "../../../api/entities/VCLJwt";
import VCLFinalizeOffersDescriptor from "../../../api/entities/VCLFinalizeOffersDescriptor";
import CredentialIssuerVerifier from "../../domain/verifiers/CredentialIssuerVerifier";
import { loadJsonldContext } from "../../utils/LoadJsonldContext";
import { verifyByCredentialType } from "@velocitycareerlabs/vc-checks";
import NetworkService from "../../domain/infrastructure/network/NetworkService";
import CredentialTypesModel from "../../domain/models/CredentialTypesModel";

export default class CredentialIssuerVerifierImpl implements CredentialIssuerVerifier {
    constructor(
        private credentialTypesModel: CredentialTypesModel,
        private networkService: NetworkService
    )
    {}
    async verifyCredentials(
        jwtCredentials: VCLJwt[],
        finalizeOffersDescriptor: VCLFinalizeOffersDescriptor
    ): Promise<boolean> {
        const verifiedPromises = jwtCredentials.map(async (jwtCredential) => {
            const jsonldContext = await loadJsonldContext(jwtCredential.payload.vc, this.networkService);
            return await verifyByCredentialType(
                {
                    credential: jwtCredential.payload.vc,
                    organizationVerifiedProfile: finalizeOffersDescriptor.credentialManifest.verifiedProfile.payload,
                    credentialTypeMetadata: this.credentialTypesModel.data?.payload,
                    jsonldContext: jsonldContext
                },
                {
                    log: console,
                    config: {}
                }
            );
        });
        // eslint-disable-next-line unused-imports/no-unused-vars,no-unused-vars
        const verified = await Promise.all(verifiedPromises);
        /**
         * commented out, because
         * https://github.com/velocitycareerlabs/monorepo/blob/main/packages/vc-checks/src/check-identity-issuer.js#L20
         * returns undefined
         * TODO: uncomment when https://velocitycareerlabs.atlassian.net/browse/VL-8258 is fixed
         */
        // return verified.every((v) => v);
        return true;
    }
}