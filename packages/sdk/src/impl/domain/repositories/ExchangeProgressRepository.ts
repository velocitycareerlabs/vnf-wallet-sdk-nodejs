// package io.velocitycareerlabs.impl.domain.repositories

import VCLExchange from "../../../api/entities/VCLExchange";
import VCLExchangeDescriptor from "../../../api/entities/VCLExchangeDescriptor";
import VCLResult from "../../../api/entities/VCLResult";

export default interface ExchangeProgressRepository {
    getExchangeProgress(
        exchangeDescriptor: VCLExchangeDescriptor,
        completionBlock: (r: VCLResult<VCLExchange>) => any
    ): void;
}
