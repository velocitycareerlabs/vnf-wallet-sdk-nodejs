import VCLEnvironment from "@velocitycareerlabs/vnf-nodejs-wallet-sdk/src/api/VCLEnvironment";

describe("Imports Test", () => {

    test("testEnvironment", async () => {

        expect(VCLEnvironment.DEV).toBeDefined();
    });
});
