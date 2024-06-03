/**
 * Created by Michael Avoyan on 03/06/2024.
 *
 * Copyright 2022 Velocity Career Labs inc.
 * SPDX-License-Identifier: Apache-2.0
 */
import VCLPresentationRequest from "../../../api/entities/VCLPresentationRequest";
import VCLDeepLink from "../../../api/entities/VCLDeepLink";
import PresentationRequestByDeepLinkVerifier from "../../domain/verifiers/PresentationRequestByDeepLinkVerifier";

export default class PresentationRequestByDeepLinkVerifierImpl implements PresentationRequestByDeepLinkVerifier{
    // eslint-disable-next-line unused-imports/no-unused-vars,no-unused-vars
    async verifyPresentationRequest(presentationRequest: VCLPresentationRequest, deepLink: VCLDeepLink): Promise<boolean> {
        return true;
    }
}