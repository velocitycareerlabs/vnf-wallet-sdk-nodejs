export default class VCLExchange {
    constructor(
        public id: string,
        public type: string,
        public disclosureComplete: boolean,
        public exchangeComplete: boolean
    ) {}

    static readonly KeyId: string = "id";
    static readonly KeyType: string = "type";
    static readonly KeyDisclosureComplete: string = "disclosureComplete";
    static readonly KeyExchangeComplete: string = "exchangeComplete";
}
