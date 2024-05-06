import { Nullish } from "../../../types";

export default interface Model<T> {
    data: Nullish<T>;
}
