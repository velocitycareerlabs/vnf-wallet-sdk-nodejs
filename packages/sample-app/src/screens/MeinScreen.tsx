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
    getPresentationRequest,
    submitPresentation,
    getCredentialManifestByDeepLink,
    getCredentialManifestByService,
    generateOffers,
    searchForOrganizations,
    generateDidJwk, finalizeOffers, checkOffers
} from "../repositories";
import { Constants } from "./Constants";
import { Dictionary } from "../Types";
import { getApprovedRejectedOfferIdsMock } from "../utils/Utils";

let didJwk: Dictionary<any>;
const initialization = async () => {
    if (!didJwk) {
        didJwk = await generateDidJwk({
            signatureAlgorithm: "P-256",
            remoteCryptoServicesToken: null
        });
    }
    console.log('didJwk: ', didJwk);
};

// @ts-ignore
await initialization();

const onGetCountries = () => {
    getCountries().then((countries) => {
        console.log('countries: ', countries);
    }).catch((error) => {
        console.log(error);
    });
};

const onGetCredentialTypes = () => {
    getCredentialTypes().then((credentialTypes) => {
        console.log('credential types: ', credentialTypes);
    }).catch((error) => {
        console.log(error);
    });
};

const onGetCredentialTypeSchemas = () => {
    getCredentialTypeSchemas().then((credentialTypeSchemas) => {
        console.log('credential typeSchemas: ', credentialTypeSchemas);
    }).catch((error) => {
        console.log(error);
    });
};

const onGetPresentationRequest = () => {
    getPresentationRequest({value: Constants.PresentationRequestDeepLinkStrDev} )
        .then((presentationRequest) => {
        console.log('presentation request: ', presentationRequest);
            onSubmitPresentation(presentationRequest);
    })
        .catch((error) => {
        console.log(error);
    });
};

const onSubmitPresentation = (presentationRequest: Dictionary<any>) => {
    submitPresentation({
            verifiableCredentials: Constants.PresentationSelectionsList,
            presentationRequest: presentationRequest
        }
    ).then((submissionResult) => {
        console.log('submission result: ', submissionResult);
    }).catch((error) => {
        console.log(error);
    });
};

const onGetCredentialManifestByDeepLink = () => {
    getCredentialManifestByDeepLink(
        { value: Constants.CredentialManifestDeepLinkStrDev }
    ).then((credentialManifest) => {
        console.log('credential manifest: ', credentialManifest);
        onGenerateOffers(credentialManifest);
    }).catch((error) => {
        console.log(error);
    });
};

const onGetOrganizationsThenCredentialManifestByService = () => {
    searchForOrganizations({
        filter: { 'did': Constants.DidDev }
    }).then((organizations) => {
        console.log('organizations: ', organizations);
        const serviceCredentialAgentIssuer = organizations.all[0].payload.service[0];
        getCredentialManifestByService({
            service: serviceCredentialAgentIssuer,
            issuingType: 'Career',
            credentialTypes: [serviceCredentialAgentIssuer.type], // Can come from any where
            didJwk: didJwk
        }).then((credentialManifest) => {
            console.log('credential manifest: ', credentialManifest);
            onGenerateOffers(credentialManifest);
        }).catch((error) => {
            console.log(error);
        });
    }).catch((error) => {
        console.log(error);
    });
}

const onGenerateOffers = (credentialManifest: Dictionary<any>) => {
    const generateOffersDescriptor = {
        credentialManifest: credentialManifest,
        types: Constants.CredentialTypes,
        identificationVerifiableCredentials: Constants.IdentificationList
    }
    generateOffers(generateOffersDescriptor).then((offers) => {
        console.log('generate offers: ', offers);
        onCheckOffers(generateOffersDescriptor, offers.sessionToken)
    }).catch((error) => {
        console.log(error);
    })
};

const onCheckOffers = (generateOffersDescriptor: Dictionary<any>, sessionToken: Dictionary<any>) => {
    checkOffers(generateOffersDescriptor, sessionToken).then((offers) => {
        console.log('check offers: ', offers);
        onFinalizeOffers(generateOffersDescriptor.credentialManifest, offers);
    }).catch((error) => {
        console.log(error);
    });
}

const onFinalizeOffers = (credentialManifest: Dictionary<any>, offers: Dictionary<any>) => {
    const approvedRejectedOfferIds = getApprovedRejectedOfferIdsMock(offers)
    const finalizeOffersDescriptor = {
        credentialManifest: credentialManifest,
        challenge: offers.challenge,
        approvedOfferIds: approvedRejectedOfferIds[0],
        rejectedOfferIds: approvedRejectedOfferIds[1]
    }
    finalizeOffers(finalizeOffersDescriptor, offers.sessionToken).then((credentials) => {
        console.log('credentials: ', credentials);
    }).catch((error) => {
        console.log(error);
    });
}

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
        'Receiving Credentials (aka Issuing) By Deeplink': onGetCredentialManifestByDeepLink,
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
