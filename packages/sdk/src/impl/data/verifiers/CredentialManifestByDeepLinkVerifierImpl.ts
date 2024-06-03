/**
 * Created by Michael Avoyan on 03/06/2024.
 *
 * Copyright 2022 Velocity Career Labs inc.
 * SPDX-License-Identifier: Apache-2.0
 */
import VCLCredentialManifest from "../../../api/entities/VCLCredentialManifest";
import VCLDeepLink from "../../../api/entities/VCLDeepLink";
import CredentialManifestByDeepLinkVerifier from "../../domain/verifiers/CredentialManifestByDeepLinkVerifier";

export default class CredentialManifestByDeepLinkVerifierImpl implements CredentialManifestByDeepLinkVerifier {
    // eslint-disable-next-line unused-imports/no-unused-vars,no-unused-vars
    async verifyCredentialManifest(credentialManifest: VCLCredentialManifest, deepLink: VCLDeepLink,): Promise<boolean> {
        return true;
    }
}