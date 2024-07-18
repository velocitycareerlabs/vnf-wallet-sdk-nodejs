/**
 * Created by Michael Avoyan on 03/06/2024.
 *
 * Copyright 2022 Velocity Career Labs inc.
 * SPDX-License-Identifier: Apache-2.0
 */
import { Dictionary, Nullish } from "../../../api/VCLTypes";
import VCLJwt from "../../../api/entities/VCLJwt";
import VCLFinalizeOffersDescriptor from "../../../api/entities/VCLFinalizeOffersDescriptor";
import CredentialIssuerVerifier from "../../domain/verifiers/CredentialIssuerVerifier";
import { loadJsonldContext } from "../../utils/LoadJsonldContext";
import { verifyByCredentialType } from "@velocitycareerlabs/vc-checks";
import NetworkService from "../../domain/infrastructure/network/NetworkService";

export default class CredentialIssuerVerifierImpl implements CredentialIssuerVerifier {
    constructor(private networkService: NetworkService)
    {}
    async verifyCredentials(
        jwtCredentials: VCLJwt[],
        finalizeOffersDescriptor: VCLFinalizeOffersDescriptor
    ): Promise<boolean> {
        const verifiedPromises = jwtCredentials.map(async (jwtCredential) => {
            // const issuerVc = this.getCredentialIssuerId(jwtCredential)
            const jsonldContext = await loadJsonldContext(jwtCredential.payload.vc, this.networkService);
            const credentialTypeMetadata = this.getCredentialType(jwtCredential);
            const verifiedProfile = // this.removeNotaryPermission(
                finalizeOffersDescriptor.credentialManifest.verifiedProfile
            //)
            return await verifyByCredentialType(
                {
                    credential: jwtCredential.payload,
                    organizationVerifiedProfile: verifiedProfile,
                    credentialTypeMetadata: credentialTypeMetadata,
                    jsonldContext: jsonldContext
                },
                {
                    log: console,
                    config: {}
                }
            );
        });
        const verified = await Promise.all(verifiedPromises);
        return verified.every((v) => v);
    }

    getCredentialType(jwtCredential: VCLJwt): Nullish<string> {
        const vc = jwtCredential.payload['vc'] as Dictionary<any>;
        if (vc) {
            const type = vc['type'];
            if (type && type.length > 0) {
                return type[0];
            }
        }
        return null;
    }


    getCredentialIssuerId(jwtCredential: VCLJwt): Nullish<string> {
        const vc = jwtCredential.payload?.vc
        if (vc) {
            const issuer = vc.issuer;
            if (typeof issuer === 'string') {
                return issuer;
            } else if (typeof issuer === 'object' && issuer !== null) {
                return issuer.id as string | null;
            }
        }
        return null;
    }

    // /**
    //  * For tests purposes only
    //  */
    // removeNotaryPermission(verifiedProfile: Dictionary<any>): Dictionary<any> {
    //     verifiedProfile.payload.credentialSubject =
    //         verifiedProfile.payload.credentialSubject.permittedVelocityServiceCategory = ["Issuer"];
    //     return verifiedProfile;
    // }
}