/**
 * Created by Michael Avoyan on 08/07/2024.
 *
 * Copyright 2022 Velocity Career Labs inc.
 * SPDX-License-Identifier: Apache-2.0
 */

import { getCountries } from "./CountriesRepository";
import { getCredentialTypes } from "./CredentialTypesRepository";
import { getCredentialTypeSchemas } from "./CredentialTypeSchemasRepository";
import { getPresentationRequest } from "./PresentationRequestRepository";
import { submitPresentation } from "./SubmitPresentationRepository";
import { getCredentialManifest } from "./GetCredentialManifestByDeepLinkRepository";

export {
    getCountries,
    getCredentialTypes,
    getCredentialTypeSchemas,
    getPresentationRequest,
    submitPresentation,
    getCredentialManifest
};