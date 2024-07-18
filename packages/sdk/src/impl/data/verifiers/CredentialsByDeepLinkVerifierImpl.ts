/**
 * Created by Michael Avoyan on 03/06/2024.
 *
 * Copyright 2022 Velocity Career Labs inc.
 * SPDX-License-Identifier: Apache-2.0
 */
import VCLDeepLink from "../../../api/entities/VCLDeepLink";
import CredentialsByDeepLinkVerifier from "../../domain/verifiers/CredentialsByDeepLinkVerifier";
import VCLJwt from "../../../api/entities/VCLJwt";
import VCLLog from "../../utils/VCLLog";
import VCLError from "../../../api/entities/error/VCLError";
import VCLErrorCode from "../../../api/entities/error/VCLErrorCode";

export default class CredentialsByDeepLinkVerifierImpl implements CredentialsByDeepLinkVerifier {
    async verifyCredentials(
        jwtCredentials: VCLJwt[],
        deepLink: VCLDeepLink
    ): Promise<boolean> {
        const mismatchedCredential = jwtCredentials.find(credential => credential.iss !== deepLink.did);

        if (mismatchedCredential) {
            VCLLog.e('', `mismatched credential: ${mismatchedCredential.encodedJwt} \ndeepLink: ${deepLink.value}`);
            throw new VCLError(null, VCLErrorCode.MismatchedCredentialIssuerDid);
        } else {
            return true;
        }
    }
}