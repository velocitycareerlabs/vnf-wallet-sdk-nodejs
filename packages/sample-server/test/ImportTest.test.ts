import { VCLEnvironment } from "@velocitycareerlabs/vnf-nodejs-wallet-sdk/src";

describe("Imports Test", () => {

    test("testEnvironment", async () => {

        expect(VCLEnvironment.Dev).toBeDefined();
    });
});
