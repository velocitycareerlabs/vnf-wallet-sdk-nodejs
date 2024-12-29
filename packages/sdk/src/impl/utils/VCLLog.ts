import GlobalConfig from "../GlobalConfig";

export default class VCLLog {
    static log(...params: any) {
        GlobalConfig.IsLoggerOn &&
            console.log(VCLLog.flatStringify(params));
    }

    static debug(...params: any) {
        GlobalConfig.IsLoggerOn &&
            console.debug(VCLLog.flatStringify(params));
    }

    static info(...params: any) {
        GlobalConfig.IsLoggerOn &&
            console.info(VCLLog.flatStringify(params));
    }

    static warn(...params: any) {
        GlobalConfig.IsLoggerOn &&
            console.warn(VCLLog.flatStringify(params));
    }

    static error(...params: any) {
        // always log errors
        // tslint:disable-next-line:no-console
            console.error(VCLLog.flatStringify(params));
    }

    private static flatStringify(obj: any): string {
        return JSON.stringify(obj).replace(/[\r\n]+/g, ' ');
    }
}
