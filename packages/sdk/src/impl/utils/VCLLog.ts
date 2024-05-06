import { Nullish } from "../../api/Nullish";
import GlobalConfig from "../GlobalConfig";

export default class VCLLog {
    static readonly format = "%s/%s: %s";
    static v(tag: Nullish<string>, msg: string) {
        GlobalConfig.isLoggerOn &&
            console.log(this.format, "V", GlobalConfig.LogTagPrefix + tag, msg);
    }

    static d(tag: Nullish<string>, msg: string) {
        GlobalConfig.isLoggerOn &&
            console.debug(
                this.format,
                "D",
                GlobalConfig.LogTagPrefix + tag,
                msg
            );
    }

    static i(tag: Nullish<string>, msg: string) {
        GlobalConfig.isLoggerOn &&
            console.info(
                this.format,
                "I",
                GlobalConfig.LogTagPrefix + tag,
                msg
            );
    }

    static w(tag: Nullish<string>, msg: string) {
        GlobalConfig.isLoggerOn &&
            console.warn(
                this.format,
                "W",
                GlobalConfig.LogTagPrefix + tag,
                msg
            );
    }

    static e(tag: Nullish<string>, msg: string) {
        GlobalConfig.isLoggerOn &&
            console.error(
                this.format,
                "E",
                GlobalConfig.LogTagPrefix + tag,
                msg
            );
    }
}
