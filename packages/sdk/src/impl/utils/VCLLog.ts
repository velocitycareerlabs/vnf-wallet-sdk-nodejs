import GlobalConfig from "../GlobalConfig";
import VCLLogService from "../../api/entities/initialization/VCLLogService";
import pino from "pino";

export default class VCLLog {

    private static _LoggerService: VCLLogService = pino();
    static get LoggerService(): VCLLogService {
        return this._LoggerService;
    }
    static set LoggerService(value: VCLLogService) {
        this._LoggerService = value;
    }
    static error(...params: any): void {
        // always log errors
        this.LoggerService.error(params);
    }
    static warn(...params: any): void {
        GlobalConfig.IsLoggerOn && this.LoggerService.warn(params);
    }
    static info(...params: any): void {
        GlobalConfig.IsLoggerOn && this.LoggerService.info(params);
    }
}
