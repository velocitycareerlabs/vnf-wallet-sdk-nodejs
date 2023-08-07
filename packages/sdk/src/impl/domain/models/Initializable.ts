import VCLError from "../../../api/entities/VCLError";
import VCLResult from "../../../api/entities/VCLResult";

export default interface Initializable<T> {
    initialize(): Promise<VCLError | null>;
}
