/**
 * Created by Michael Avoyan on 03/06/2024.
 *
 * Copyright 2022 Velocity Career Labs inc.
 * SPDX-License-Identifier: Apache-2.0
 */
import VCLOffers from "../../../api/entities/VCLOffers";
import VCLDeepLink from "../../../api/entities/VCLDeepLink";
import OffersByDeepLinkVerifier from "../../domain/verifiers/OffersByDeepLinkVerifier";

export default class OffersByDeepLinkVerifierImpl implements OffersByDeepLinkVerifier {
    // eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars,unused-imports/no-unused-vars
    async verifyOffers(offers: VCLOffers, deepLink: VCLDeepLink,): Promise<boolean> {
        return true;
    }
}