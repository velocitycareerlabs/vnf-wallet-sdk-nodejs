import VCLEnvironment from "../../../api/VCLEnvironment";
import GlobalConfig from "../../GlobalConfig";

export default class Urls {
    private static get EnvironmentPrefix(): string {
        return {
            [VCLEnvironment.Prod]: "",
            [VCLEnvironment.Staging]: "staging",
            [VCLEnvironment.Qa]: "qa",
            [VCLEnvironment.Dev]: "dev",
        }[GlobalConfig.CurrentEnvironment];
    }
    private static get BaseUrlServices(): string {
        return `https://${Urls.EnvironmentPrefix}registrar.velocitynetwork.foundation`;
        // return `https://${Urls.EnvironmentPrefix}walletapi.velocitycareerlabs.io`;
    }

    static get CredentialTypes(): string {
        return `${Urls.BaseUrlServices}/api/v0.6/credential-types`;
    }
    static get CredentialTypeSchemas(): string {
        return `${Urls.BaseUrlServices}/schemas/`;
    }
    static get Countries(): string {
        return `${Urls.BaseUrlServices}/reference/countries`;
    }
    static get Organizations(): string {
        return `${Urls.BaseUrlServices}/api/v0.6/organizations/search-profiles`;
    }
    static get ResolveKid(): string {
        return `${Urls.BaseUrlServices}/api/v0.6/resolve-kid/`;
    }
    static get CredentialTypesFormSchema(): string {
        return `${Urls.BaseUrlServices}/api/v0.6/form-schemas?credentialType=${Params.CredentialType}`;
    }
    static get VerifiedProfile(): string {
        return `${Urls.BaseUrlServices}/api/v0.6/organizations/${Params.Did}/verified-profile`;
    }
}

export class Params {
    static readonly Did = "{did}";
    static readonly CredentialType = "{credentialType}";
}

export class HeaderKeys {
    static readonly HeaderKeyAuthorization = "Authorization";
    static readonly HeaderValuePrefixBearer = "Bearer";
    static readonly XVnfProtocolVersion = "x-vnf-protocol-version";
}

export class HeaderValues {
    static get XVnfProtocolVersion() {
        return GlobalConfig.XVnfProtocolVersion.toString();
    }
}
