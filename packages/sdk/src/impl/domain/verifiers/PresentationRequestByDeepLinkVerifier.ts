/**
 * Created by Michael Avoyan on 03/06/2024.
 *
 * Copyright 2022 Velocity Career Labs inc.
 * SPDX-License-Identifier: Apache-2.0
 */
import VCLDeepLink from "../../../api/entities/VCLDeepLink";
import VCLPresentationRequest from "../../../api/entities/VCLPresentationRequest";

export default interface PresentationRequestByDeepLinkVerifier {
    verifyPresentationRequest(
        presentationRequest: VCLPresentationRequest,
        deepLink: VCLDeepLink,
    ): Promise<boolean>
}