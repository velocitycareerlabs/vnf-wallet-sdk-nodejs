import VCLEnvironment from "../api/VCLEnvironment";
import VCLXVnfProtocolVersion from "../api/VCLXVnfProtocolVersion";

export default class GlobalConfig {
    static IsDebugOn = false;
    static CurrentEnvironment = VCLEnvironment.Prod;
    static XVnfProtocolVersion = VCLXVnfProtocolVersion.XVnfProtocolVersion1;
    static get IsLoggerOn() {
        return (this.CurrentEnvironment != VCLEnvironment.Staging && this.CurrentEnvironment != VCLEnvironment.Prod) || this.IsDebugOn;
    }
    static IsDirectIssuerOn = true;
}
