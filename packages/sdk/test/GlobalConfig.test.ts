/**
 * Created by Michael Avoyan on 03/06/2024.
 *
 * Copyright 2022 Velocity Career Labs inc.
 * SPDX-License-Identifier: Apache-2.0
 */

import GlobalConfig from "../src/impl/GlobalConfig";
import { VCLEnvironment } from "../src";

describe('GlobalConfigTest', () => {
    beforeEach(() => {
        // Set up code here
    });

    it('should validate Dev environment', async () => {
        GlobalConfig.CurrentEnvironment = VCLEnvironment.Dev;
        expect(GlobalConfig.IsLoggerOn).toBeTruthy();

        GlobalConfig.IsDebugOn = true;
        expect(GlobalConfig.IsLoggerOn).toBeTruthy();

        GlobalConfig.IsDebugOn = false;
        expect(GlobalConfig.IsLoggerOn).toBeTruthy();
    });

    it('should validate Qa environment', async () => {
        GlobalConfig.CurrentEnvironment = VCLEnvironment.Qa;
        expect(GlobalConfig.IsLoggerOn).toBeTruthy();

        GlobalConfig.IsDebugOn = true;
        expect(GlobalConfig.IsLoggerOn).toBeTruthy();

        GlobalConfig.IsDebugOn = false;
        expect(GlobalConfig.IsLoggerOn).toBeTruthy();
    });

    it('should validate Staging environment', async () => {
        GlobalConfig.CurrentEnvironment = VCLEnvironment.Staging;
        expect(GlobalConfig.IsLoggerOn).toBeFalsy();

        GlobalConfig.IsDebugOn = true;
        expect(GlobalConfig.IsLoggerOn).toBeTruthy();

        GlobalConfig.IsDebugOn = false;
        expect(GlobalConfig.IsLoggerOn).toBeFalsy();
    });

    it('should validate Prod environment', async () => {
        GlobalConfig.CurrentEnvironment = VCLEnvironment.Prod;
        expect(GlobalConfig.IsLoggerOn).toBeFalsy();

        GlobalConfig.IsDebugOn = true;
        expect(GlobalConfig.IsLoggerOn).toBeTruthy();

        GlobalConfig.IsDebugOn = false;
        expect(GlobalConfig.IsLoggerOn).toBeFalsy();
    });

    afterEach(() => {
        // Tear down code here
    });
});
