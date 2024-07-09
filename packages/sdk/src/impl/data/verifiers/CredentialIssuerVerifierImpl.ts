/**
 * Created by Michael Avoyan on 03/06/2024.
 *
 * Copyright 2022 Velocity Career Labs inc.
 * SPDX-License-Identifier: Apache-2.0
 */
import VCLJwt from "../../../api/entities/VCLJwt";
import VCLFinalizeOffersDescriptor from "../../../api/entities/VCLFinalizeOffersDescriptor";
import CredentialIssuerVerifier from "../../domain/verifiers/CredentialIssuerVerifier";

export default class CredentialIssuerVerifierImpl implements CredentialIssuerVerifier {
    // eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars,unused-imports/no-unused-vars
    async verifyCredentials(jwtCredentials: VCLJwt[], finalizeOffersDescriptor: VCLFinalizeOffersDescriptor,): Promise<boolean> {
        return true;
    }
}