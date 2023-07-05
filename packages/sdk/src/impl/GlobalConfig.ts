import VCLEnvironment from "../api/VCLEnvironment";

export default class GlobalConfig {
    static readonly IsDebug = true;
    static CurrentEnvironment = VCLEnvironment.PROD;
    static readonly LogTagPrefix = "VCL ";
    static IsToLoadFromCacheInitialization = false;
    static get isLoggerOn() {
        return this.CurrentEnvironment !== VCLEnvironment.PROD;
    }
}
