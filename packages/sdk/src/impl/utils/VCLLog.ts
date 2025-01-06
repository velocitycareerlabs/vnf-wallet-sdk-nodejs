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

    static info(...params: any): void {
        GlobalConfig.IsLoggerOn && this.LoggerService.info(params);
    }
    static debug(...params: any): void {
        GlobalConfig.IsLoggerOn && this.LoggerService.debug(params);
    }
    static warn(...params: any): void {
        GlobalConfig.IsLoggerOn && this.LoggerService.warn(params);
    }
    static error(...params: any): void {
        // always log errors
        // tslint:disable-next-line:no-console
        this.LoggerService.error(params);
    }
}
