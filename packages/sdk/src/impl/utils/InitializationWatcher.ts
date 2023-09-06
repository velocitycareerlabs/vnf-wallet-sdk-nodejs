import VCLError from "../../api/entities/VCLError";

export default class InitializationWatcher {
    private initCount: number = 0;
    private errors: VCLError[] = [];

    constructor(private readonly initAmount: number) {}

    onInitializedModel(
        error: VCLError | null,
        enforceFailure: boolean = false
    ): boolean {
        this.initCount++;
        error && this.errors.push(error);
        return this.isInitializationComplete(enforceFailure);
    }

    firstError(): VCLError | null {
        return this.errors.length > 0 ? this.errors[0] : null;
    }

    private isInitializationComplete(enforceFailure: boolean): boolean {
        return this.initCount === this.initAmount || enforceFailure;
    }
}
