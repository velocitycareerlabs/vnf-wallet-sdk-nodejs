import VCLEnvironment from "../api/VCLEnvironment";
import VCLXVnfProtocolVersion from "../api/VCLXVnfProtocolVersion";
import VCLLogService from "../api/entities/initialization/VCLLogService";
import VCLLog from "./utils/VCLLog";

export default class GlobalConfig {
    private static _IsDebugOn = false;
    public static get IsDebugOn(): boolean {
        return this._IsDebugOn;
    }
    public static set IsDebugOn(value: boolean) {
        this._IsDebugOn = value;
    }

    private static _CurrentEnvironment = VCLEnvironment.Prod;
    public static get CurrentEnvironment(): VCLEnvironment {
        return this._CurrentEnvironment;
    }
    public static set CurrentEnvironment(value: VCLEnvironment) {
        this._CurrentEnvironment = value;
    }

    private static _XVnfProtocolVersion = VCLXVnfProtocolVersion.XVnfProtocolVersion1;
    public static get XVnfProtocolVersion(): VCLXVnfProtocolVersion {
        return this._XVnfProtocolVersion;
    }
    public static set XVnfProtocolVersion(value: VCLXVnfProtocolVersion) {
        this._XVnfProtocolVersion = value;
    }

    private static _IsDirectIssuerOn = true;
    public static get IsDirectIssuerOn(): boolean {
        return this._IsDirectIssuerOn;
    }
    public static set IsDirectIssuerOn(value: boolean) {
        this._IsDirectIssuerOn = value;
    }

    public static set LoggerService(value: VCLLogService) {
        VCLLog.LoggerService = value;
    }

    static get IsLoggerOn() {
        return (this.CurrentEnvironment != VCLEnvironment.Staging && this.CurrentEnvironment != VCLEnvironment.Prod) || this.IsDebugOn;
    }

}
