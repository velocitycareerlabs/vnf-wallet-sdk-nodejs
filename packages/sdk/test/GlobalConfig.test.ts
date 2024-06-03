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

    it('should validate Dev environment', () => {
        GlobalConfig.CurrentEnvironment = VCLEnvironment.Dev;
        expect(GlobalConfig.IsLoggerOn).toBeTruthy();

        GlobalConfig.IsDebugOn = true;
        expect(GlobalConfig.IsLoggerOn).toBeTruthy();

        GlobalConfig.IsDebugOn = false;
        expect(GlobalConfig.IsLoggerOn).toBeTruthy();
    });

    it('should validate Qa environment', () => {
        GlobalConfig.CurrentEnvironment = VCLEnvironment.Qa;
        expect(GlobalConfig.IsLoggerOn).toBeTruthy();

        GlobalConfig.IsDebugOn = true;
        expect(GlobalConfig.IsLoggerOn).toBeTruthy();

        GlobalConfig.IsDebugOn = false;
        expect(GlobalConfig.IsLoggerOn).toBeTruthy();
    });

    it('should validate Staging environment', () => {
        GlobalConfig.CurrentEnvironment = VCLEnvironment.Staging;
        expect(GlobalConfig.IsLoggerOn).toBeFalsy();

        GlobalConfig.IsDebugOn = true;
        expect(GlobalConfig.IsLoggerOn).toBeTruthy();

        GlobalConfig.IsDebugOn = false;
        expect(GlobalConfig.IsLoggerOn).toBeFalsy();
    });

    it('should validate Prod environment', () => {
        GlobalConfig.CurrentEnvironment = VCLEnvironment.Prod;
        expect(GlobalConfig.IsLoggerOn).toBeFalsy();

        GlobalConfig.IsDebugOn = true;
        expect(GlobalConfig.IsLoggerOn).toBeTruthy();

        GlobalConfig.IsDebugOn = false;
        expect(GlobalConfig.IsLoggerOn).toBeFalsy();
    });

    it('should validate log tag prefix', () => {
        expect(GlobalConfig.LogTagPrefix).toBe('VCL ');
    });

    afterEach(() => {
        // Tear down code here
    });
});
