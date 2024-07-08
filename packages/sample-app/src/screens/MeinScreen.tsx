/**
 * Created by Michael Avoyan on 07/07/2024.
 *
 * Copyright 2022 Velocity Career Labs inc.
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
    getCountriesRepository,
    getCredentialTypeSchemasRepository,
    getCredentialTypesRepository
} from "../repositories";

const getCountries = async () => {
    console.log(await getCountriesRepository());
};
const getCredentialTypes = async () => {
    console.log(await getCredentialTypesRepository());
};
const getCredentialTypeSchemas = async () => {
    console.log(await getCredentialTypeSchemasRepository());
};
const getPresentationRequest = () => {
    alert(`You clicked on getPresentationRequest`);
};
const getCredentialManifestByDeepLink = () => {
    alert(`You clicked on getCredentialManifestByDeepLink`);
};
const getOrganizationsThenCredentialManifestByService = () => {
    alert(`You clicked on getOrganizationsThenCredentialManifestByService`);
};
const getCredentialTypesUIFormSchema = () => {
    alert(`You clicked on getCredentialTypesUIFormSchema`);
};
const refreshCredentials = () => {
    alert(`You clicked on refreshCredentials`);
};
const getVerifiedProfile = () => {
    alert(`You clicked on getVerifiedProfile`);
};
const verifyJwt = () => {
    alert(`You clicked on verifyJwt`);
};
const generateSignedJwt = () => {
    alert(`You clicked on generateSignedJwt`);
};
const generateDidJwk = () => {
    alert(`You clicked on generateDidJwk`);
};

const MeinScreen: React.FC = () => {
    const menuItems = {
        'Get Countries': getCountries,
        'Get Credential Types': getCredentialTypes,
        'Get Credential Type Schemas': getCredentialTypeSchemas,
        'Disclosing Credentials (aka Inspection)': getPresentationRequest,
        'Receiving Credentials (aka Issuing) By Deeplink': getCredentialManifestByDeepLink,
        'Receiving Credentials (aka Issuing) By Services': getOrganizationsThenCredentialManifestByService,
        'Self Reporting Credentials (aka Self Attested)': getCredentialTypesUIFormSchema,
        'Refresh Credentials': refreshCredentials,
        'Get Verified Profile': getVerifiedProfile,
        'Verify JWT': verifyJwt,
        'Generate Signed JWT': generateSignedJwt,
        'Generate DID:JWK': generateDidJwk,
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
