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
        const verified = await Promise.all(verifiedPromises);
        return verified.every((v) => v);
    }
}