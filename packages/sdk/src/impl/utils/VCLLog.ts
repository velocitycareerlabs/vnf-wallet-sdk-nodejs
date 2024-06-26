import { Nullish } from "../../api/VCLTypes";
import GlobalConfig from "../GlobalConfig";

export default class VCLLog {
    static readonly format = "%s/%s: %s";
    static v(tag: Nullish<string>, msg: string) {
        GlobalConfig.IsLoggerOn &&
            console.log(this.format, "V", GlobalConfig.LogTagPrefix + tag, msg);
    }

    static d(tag: Nullish<string>, msg: string) {
        GlobalConfig.IsLoggerOn &&
            console.debug(
                this.format,
                "D",
                GlobalConfig.LogTagPrefix + tag,
                msg
            );
    }

    static i(tag: Nullish<string>, msg: string) {
        GlobalConfig.IsLoggerOn &&
            console.info(
                this.format,
                "I",
                GlobalConfig.LogTagPrefix + tag,
                msg
            );
    }

    static w(tag: Nullish<string>, msg: string) {
        GlobalConfig.IsLoggerOn &&
            console.warn(
                this.format,
                "W",
                GlobalConfig.LogTagPrefix + tag,
                msg
            );
    }

    static e(tag: Nullish<string>, msg: string) {
        GlobalConfig.IsLoggerOn &&
            console.error(
                this.format,
                "E",
                GlobalConfig.LogTagPrefix + tag,
                msg
            );
    }
}
