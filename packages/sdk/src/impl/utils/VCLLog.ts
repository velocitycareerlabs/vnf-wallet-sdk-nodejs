import GlobalConfig from "../GlobalConfig";

export default class VCLLog {
    static readonly format = "%s/%s: %s";
    static v(tag: string | null | undefined, msg: string) {
        GlobalConfig.isLoggerOn &&
            console.log(this.format, "V", GlobalConfig.LogTagPrefix + tag, msg);
    }

    static d(tag: string | null | undefined, msg: string) {
        GlobalConfig.isLoggerOn &&
            console.debug(
                this.format,
                "D",
                GlobalConfig.LogTagPrefix + tag,
                msg
            );
    }

    static i(tag: string | null | undefined, msg: string) {
        GlobalConfig.isLoggerOn &&
            console.info(
                this.format,
                "I",
                GlobalConfig.LogTagPrefix + tag,
                msg
            );
    }

    static w(tag: string | null | undefined, msg: string) {
        GlobalConfig.isLoggerOn &&
            console.warn(
                this.format,
                "W",
                GlobalConfig.LogTagPrefix + tag,
                msg
            );
    }

    static e(tag: string | null | undefined, msg: string) {
        GlobalConfig.isLoggerOn &&
            console.error(
                this.format,
                "E",
                GlobalConfig.LogTagPrefix + tag,
                msg
            );
    }
}
