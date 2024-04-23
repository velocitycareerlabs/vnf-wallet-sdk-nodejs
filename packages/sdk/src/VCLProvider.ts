import { VCLImpl } from "./impl/VCLImpl";

export class VCLProvider {
    private static vclInstance: VCLImpl;

    constructor() {
        if (!VCLProvider.vclInstance) {
            VCLProvider.vclInstance = new VCLImpl();
        }
    }

    getInstance(): VCLImpl {
        return VCLProvider.vclInstance;
    }
}
