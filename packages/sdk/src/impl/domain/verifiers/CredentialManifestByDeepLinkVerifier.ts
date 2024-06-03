/**
 * Created by Michael Avoyan on 03/06/2024.
 *
 * Copyright 2022 Velocity Career Labs inc.
 * SPDX-License-Identifier: Apache-2.0
 */
import VCLCredentialManifest from "../../../api/entities/VCLCredentialManifest";
import VCLDeepLink from "../../../api/entities/VCLDeepLink";

export default interface CredentialManifestByDeepLinkVerifier {
    verifyCredentialManifest(
        credentialManifest: VCLCredentialManifest,
        deepLink: VCLDeepLink,
    ): Promise<boolean>
}