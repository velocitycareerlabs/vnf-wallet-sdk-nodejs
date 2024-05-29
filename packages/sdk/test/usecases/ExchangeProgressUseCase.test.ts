import NetworkServiceSuccess from "../NetworkServiceSuccess";
import ExchangeProgressRepositoryImpl from "../../src/impl/data/repositories/ExchangeProgressRepositoryImpl";
import ExchangeProgressUseCaseImpl from "../../src/impl/data/usecases/ExchangeProgressUseCaseImpl";
import { ExchangeProgressMocks } from "../infrastructure/resources/valid/ExchangeProgressMocks";
import { Dictionary, VCLExchange, VCLExchangeDescriptor, VCLToken } from "../../src";
import { expect } from "@jest/globals";

describe("ExchangeProgressUseCase Tests", () => {
    const subject1 = new ExchangeProgressUseCaseImpl(
        new ExchangeProgressRepositoryImpl(
            new NetworkServiceSuccess(JSON.parse(ExchangeProgressMocks.ExchangeProgressJsonStr))
        )
    )
    const subject2 = new ExchangeProgressUseCaseImpl(
        new ExchangeProgressRepositoryImpl(
            new NetworkServiceSuccess('')
        )
    )
    const exchangeDescriptor = {
        exchangeId: "",
        processUri: "",
        sessionToken: new VCLToken("")
    } as VCLExchangeDescriptor;

    test("testGetExchangeProgressSuccess", async () => {
        const exchange = await subject1.getExchangeProgress(exchangeDescriptor)

        expect(exchange).toStrictEqual(expectedExchange(JSON.parse(ExchangeProgressMocks.ExchangeProgressJsonStr)))
    });

    test("testGetExchangeProgressFailure", async () => {
        const exchange = await subject2.getExchangeProgress(exchangeDescriptor)

        expect(exchange.id).toBe(undefined)
        expect(exchange.type).toBe(undefined)
        expect(exchange.disclosureComplete).toBe(undefined)
        expect(exchange.exchangeComplete).toBe(undefined)
    });

    const expectedExchange = (exchangeJsonObj: Dictionary<any>): VCLExchange => {
        return new VCLExchange(
            exchangeJsonObj[VCLExchange.KeyId],
            exchangeJsonObj[VCLExchange.KeyType],
            exchangeJsonObj[VCLExchange.KeyDisclosureComplete],
            exchangeJsonObj[VCLExchange.KeyExchangeComplete]
        );
    }

});