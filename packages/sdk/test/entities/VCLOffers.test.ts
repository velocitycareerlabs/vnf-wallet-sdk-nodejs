import { VCLOffers, VCLToken } from "../../src";
import { OffersMocks } from "../infrastructure/resources/valid/OffersMocks";

describe("VCLOffers tests", () => {
    const subject1 = VCLOffers.fromPayload(
        JSON.parse(OffersMocks.offersJsonArrayStr),
        123,
        new VCLToken('some token')
    );
    const subject2 = VCLOffers.fromPayload(
        JSON.parse(OffersMocks.offersJsonObjectStr),
        123,
        new VCLToken('some token')
    );
    const subject3 = VCLOffers.fromPayload(
        JSON.parse(OffersMocks.offersJsonEmptyArrayStr),
        123,
        new VCLToken('some token')
    );
    const subject4 = VCLOffers.fromPayload(
        JSON.parse(OffersMocks.offersJsonEmptyObjectStr),
        123,
        new VCLToken('some token')
    );

    test("VCLOffers from array test", async () => {
        expect(subject1.payload).toEqual(JSON.parse(OffersMocks.offersJsonArrayStr));
        testExpectations(subject1);
        expect(subject1.challenge).toBe(null);
        expect(subject1.all.map((offer) => offer.payload)).toStrictEqual(JSON.parse(OffersMocks.offersJsonArrayStr));
    })

    test("VCLOffers from object test", async () => {
        expect(subject2.payload).toEqual(JSON.parse(OffersMocks.offersJsonObjectStr));
        testExpectations(subject2);
        expect(subject2.challenge).toBe(OffersMocks.challenge);
        expect(subject2.all.map((offer) => offer.payload)).toStrictEqual(JSON.parse(OffersMocks.offersJsonArrayStr));
    })

    test("VCLOffers from emprty array test", async () => {
        expect(subject3.payload).toEqual(JSON.parse(OffersMocks.offersJsonEmptyArrayStr));
        testExpectations(subject1);
        expect(subject3.challenge).toBe(null);
        expect(subject3.all.map((offer) => offer.payload)).toStrictEqual(JSON.parse(OffersMocks.offersJsonEmptyArrayStr));
    })

    test("VCLOffers from empty object test", async () => {
        expect(subject4.payload).toEqual(JSON.parse(OffersMocks.offersJsonEmptyObjectStr));
        testExpectations(subject2);
        expect(subject4.challenge).toBe(OffersMocks.challenge);
        expect(subject4.all.map((offer) => offer.payload)).toStrictEqual(JSON.parse(OffersMocks.offersJsonEmptyArrayStr));
    })

    const testExpectations = (subject: VCLOffers) => {
        expect(subject.responseCode).toBe(123);
        expect(subject.sessionToken).toStrictEqual(new VCLToken('some token'));
        expect(subject.all.length).toBe(11);
    }
})