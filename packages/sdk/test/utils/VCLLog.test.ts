import VCLLog from '../../src/impl/utils/VCLLog';
import GlobalConfig from "../../src/impl/GlobalConfig";

// Mock LoggerService with spies for its methods
const mockLoggerService = {
    error: jest.fn(),
    warn: jest.fn(),
    info: jest.fn(),
};

describe('VCLLog', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        VCLLog.LoggerService = mockLoggerService;
        GlobalConfig.IsDebugOn = true;
    });

    describe('LoggerService', () => {
        it('should set and get the LoggerService correctly', () => {
            const customLoggerService = {
                error: jest.fn(),
                warn: jest.fn(),
                info: jest.fn(),
            };
            VCLLog.LoggerService = customLoggerService;
            expect(VCLLog.LoggerService).toBe(customLoggerService);
        });
    });

    describe('error()', () => {
        it('should always call LoggerService.error', () => {
            VCLLog.error('Error message');
            expect(mockLoggerService.error).toHaveBeenCalledTimes(1);
            expect(mockLoggerService.error).toHaveBeenCalledWith(['Error message']);
        });
    });

    describe('warn()', () => {
        it('should call LoggerService.warn if IsLoggerOn is true', () => {
            VCLLog.warn('Warn message');
            expect(mockLoggerService.warn).toHaveBeenCalledTimes(1);
            expect(mockLoggerService.warn).toHaveBeenCalledWith(['Warn message']);
        });

        it('should not call LoggerService.warn if IsLoggerOn is false', () => {
            GlobalConfig.IsDebugOn = false;
            VCLLog.warn('Warn message');
            expect(mockLoggerService.warn).not.toHaveBeenCalled();
        });
    });

    describe('info()', () => {
        it('should call LoggerService.info if IsLoggerOn is true', () => {
            VCLLog.info('Info message');
            expect(mockLoggerService.info).toHaveBeenCalledTimes(1);
            expect(mockLoggerService.info).toHaveBeenCalledWith(['Info message']);
        });

        it('should not call LoggerService.info if IsLoggerOn is false', () => {
            GlobalConfig.IsDebugOn = false;
            VCLLog.info('Info message');
            expect(mockLoggerService.info).not.toHaveBeenCalled();
        });
    });
});
