import VCLError from '../../src/api/entities/error/VCLError';
import { ErrorMocks } from '../infrastructure/resources/valid/ErrorMocks';
import '../../src/impl/extensions/StringExtensions';
import '../../src/impl/extensions/ListExtensions';
import '../../src/impl/extensions/DateExtensions';

describe('VCLError Tests', () => {
    test('testErrorFromPayload', () => {
        const error = VCLError.fromPayload(ErrorMocks.Payload);

        expect(error.payload).toBe(ErrorMocks.Payload);
        expect(error.error).toBe(ErrorMocks.Error);
        expect(error.errorCode).toBe(ErrorMocks.ErrorCode);
        expect(error.message).toBe(ErrorMocks.Message);
        expect(error.statusCode).toBe(ErrorMocks.StatusCode);
    });

    test('testErrorFromProperties', () => {
        const error = new VCLError(
            ErrorMocks.Error,
            ErrorMocks.ErrorCode,
            ErrorMocks.Message,
            ErrorMocks.StatusCode
        );

        expect(error.payload).toBeNull();
        expect(error.error).toBe(ErrorMocks.Error);
        expect(error.errorCode).toBe(ErrorMocks.ErrorCode);
        expect(error.message).toBe(ErrorMocks.Message);
        expect(error.statusCode).toBe(ErrorMocks.StatusCode);
    });

    test('testErrorToJsonFromPayload', () => {
        const error = VCLError.fromPayload(ErrorMocks.Payload);
        const errorJsonObject = error.jsonObject;

        expect(errorJsonObject[VCLError.KeyPayload]).toBe(ErrorMocks.Payload);
        expect(errorJsonObject[VCLError.KeyError]).toBe(ErrorMocks.Error);
        expect(errorJsonObject[VCLError.KeyErrorCode]).toBe(
            ErrorMocks.ErrorCode
        );
        expect(errorJsonObject[VCLError.KeyMessage]).toBe(ErrorMocks.Message);
        expect(errorJsonObject[VCLError.KeyStatusCode]).toBe(
            ErrorMocks.StatusCode
        );
    });

    test('testErrorToJsonFromProperties', () => {
        const error = new VCLError(
            ErrorMocks.Error,
            ErrorMocks.ErrorCode,
            ErrorMocks.Message,
            ErrorMocks.StatusCode
        );
        const errorJsonObject = error.jsonObject;

        console.log('--------------------');
        console.log(JSON.stringify(errorJsonObject));

        expect(errorJsonObject[VCLError.KeyPayload]).toBeFalsy();
        expect(errorJsonObject[VCLError.KeyError]).toBe(ErrorMocks.Error);
        expect(errorJsonObject[VCLError.KeyErrorCode]).toBe(
            ErrorMocks.ErrorCode
        );
        expect(errorJsonObject[VCLError.KeyMessage]).toBe(ErrorMocks.Message);
        expect(errorJsonObject[VCLError.KeyStatusCode]).toBe(
            ErrorMocks.StatusCode
        );
    });
});
