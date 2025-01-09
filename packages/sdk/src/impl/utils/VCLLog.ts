import GlobalConfig from "../GlobalConfig";
import VCLLogService, { LogFn } from "../../api/entities/initialization/VCLLogService";
import pino from "pino";

export default class VCLLog {

    private static _LoggerService: VCLLogService = pino();
    static get LoggerService(): VCLLogService {
        return this._LoggerService;
    }
    static set LoggerService(value: VCLLogService) {
        this._LoggerService = value;
    }
    static error: LogFn = (obj: any, msg?: string, ...args: any[]) => {
        // always log errors
        this.LoggerService.error(obj, msg, ...args);
    }
    static warn: LogFn = (obj: any, msg?: string, ...args: any[]) => {
        GlobalConfig.IsLoggerOn && this.LoggerService.warn(obj, msg, ...args);
    }
    static info: LogFn = (obj: any, msg?: string, ...args: any[]) => {
        GlobalConfig.IsLoggerOn && this.LoggerService.info(obj, msg, ...args);
    }
}
