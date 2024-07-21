/* eslint-disable unused-imports/no-unused-vars,no-unused-vars */
/**
 * Created by Michael Avoyan on 21/07/2024.
 *
 * Copyright 2022 Velocity Career Labs inc.
 * SPDX-License-Identifier: Apache-2.0
 */
import CredentialIssuerVerifier from "../../domain/verifiers/CredentialIssuerVerifier";
import { VCLJwt, VCLFinalizeOffersDescriptor } from "src/index";

export default class CredentialIssuerVerifierImpl implements CredentialIssuerVerifier {
    async verifyCredentials(jwtCredentials: VCLJwt[], finalizeOffersDescriptor: VCLFinalizeOffersDescriptor): Promise<boolean> {
        return true;
    }

}