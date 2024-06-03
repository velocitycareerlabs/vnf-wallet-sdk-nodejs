/**
 * Created by Michael Avoyan on 03/06/2024.
 *
 * Copyright 2022 Velocity Career Labs inc.
 * SPDX-License-Identifier: Apache-2.0
 */
import VCLDeepLink from "../../../api/entities/VCLDeepLink";
import CredentialsByDeepLinkVerifier from "../../domain/verifiers/CredentialsByDeepLinkVerifier";
import VCLJwt from "../../../api/entities/VCLJwt";

export default class CredentialsByDeepLinkVerifierImpl implements CredentialsByDeepLinkVerifier {
    // eslint-disable-next-line unused-imports/no-unused-vars,no-unused-vars
    async verifyCredentials(jwtCredentials: VCLJwt[], deepLink: VCLDeepLink,): Promise<boolean> {
        return true;
    }
}