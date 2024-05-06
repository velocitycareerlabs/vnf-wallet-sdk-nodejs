import VCLCredentialTypes from "../../../api/entities/VCLCredentialTypes";
import VCLError from "../../../api/entities/error/VCLError";
import VCLResult from "../../../api/entities/VCLResult";
import CredentialTypesModel from "../../domain/models/CredentialTypesModel";
import { CredentialTypesUseCase } from "../../domain/usecases/CredentialTypesUseCase";
import { Nullish } from "../../../types";

export default class CredentialTypesModelImpl implements CredentialTypesModel {
    constructor(
        private readonly credentialTypesUseCase: CredentialTypesUseCase
    ) {}
    data: Nullish<VCLCredentialTypes>;
    async initialize(): Promise<VCLError | null> {
        const result = await this.credentialTypesUseCase.getCredentialTypes();

        const [err, d] = result.handleResult();
        if (err) {
            return err;
        }
        this.data = result.getData();
        return null;
    }
}
