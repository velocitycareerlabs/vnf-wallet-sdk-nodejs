import VCLError from "../../../api/entities/error/VCLError";
import VCLResult from "../../../api/entities/VCLResult";

export default interface Initializable<T> {
    initialize(): Promise<VCLError | null>;
}
