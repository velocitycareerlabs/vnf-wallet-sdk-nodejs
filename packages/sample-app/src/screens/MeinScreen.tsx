/**
 * Created by Michael Avoyan on 07/07/2024.
 *
 * Copyright 2022 Velocity Career Labs inc.
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
    getCountries,
    getCredentialTypeSchemas,
    getCredentialTypes,
    getPresentationRequest
} from "../repositories";
import { Constants } from "./Constants";

const onGetCountries = () => {
    getCountries().then((response) => {
        console.log(response);
    }).catch((error) => {
        console.log(error);
    });
};
const onGetCredentialTypes = () => {
    getCredentialTypes().then((response) => {
        console.log(response);
    }).catch((error) => {
        console.log(error);
    });
};
const onGetCredentialTypeSchemas = () => {
    getCredentialTypeSchemas().then((response) => {
        console.log(response);
    }).catch((error) => {
        console.log(error);
    });
};
const onGetPresentationRequest = () => {
    getPresentationRequest(Constants.PresentationRequestDeepLinkStrDev)
        .then((presentationRequest) => {
        console.log(presentationRequest);
    })
        .catch((error) => {
        console.log(error);
    });
};
const gonGetCredentialManifestByDeepLink = () => {
    alert(`You clicked on getCredentialManifestByDeepLink`);
};
const onGetOrganizationsThenCredentialManifestByService = () => {
    alert(`You clicked on getOrganizationsThenCredentialManifestByService`);
};
const onGetCredentialTypesUIFormSchema = () => {
    alert(`You clicked on getCredentialTypesUIFormSchema`);
};
const onRefreshCredentials = () => {
    alert(`You clicked on refreshCredentials`);
};
const onGetVerifiedProfile = () => {
    alert(`You clicked on getVerifiedProfile`);
};
const onVerifyJwt = () => {
    alert(`You clicked on verifyJwt`);
};
const onGenerateSignedJwt = () => {
    alert(`You clicked on generateSignedJwt`);
};
const onGenerateDidJwk = () => {
    alert(`You clicked on generateDidJwk`);
};

const MeinScreen: React.FC = () => {
    const menuItems = {
        'Get Countries': onGetCountries,
        'Get Credential Types': onGetCredentialTypes,
        'Get Credential Type Schemas': onGetCredentialTypeSchemas,
        'Disclosing Credentials (aka Inspection)': onGetPresentationRequest,
        'Receiving Credentials (aka Issuing) By Deeplink': gonGetCredentialManifestByDeepLink,
        'Receiving Credentials (aka Issuing) By Services': onGetOrganizationsThenCredentialManifestByService,
        'Self Reporting Credentials (aka Self Attested)': onGetCredentialTypesUIFormSchema,
        'Refresh Credentials': onRefreshCredentials,
        'Get Verified Profile': onGetVerifiedProfile,
        'Verify JWT': onVerifyJwt,
        'Generate Signed JWT': onGenerateSignedJwt,
        'Generate DID:JWK': onGenerateDidJwk,
    };

    return (
        <div>
            <h1>Sample App</h1>
            <ul>
                {Object.entries(menuItems).map(([key, value]) => (
                    <li key={key} onClick={value}>
                        {key}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MeinScreen;
