import SitesFieldCountAggregator from "../../../../src/domain/stats/fieldAggregation/SitesFieldCountAggregator";
import DiscreteVariableCountReponseObjectMother from "../../../utils/objectMothers/models/response/DiscreteVariableCountReponseObjectMother";
import FieldResponseObjectMother from "../../../utils/objectMothers/models/response/FieldResponseObjectMother"

describe('SitesFieldCountAggregator tests', () => {
    it('with normal count fields, accumulates the count', () => {
        // ARRANGE
        const fieldA = FieldResponseObjectMother.getWithCount(54);
        const fieldB = FieldResponseObjectMother.getWithCount(61);

        // ACT
        const count = SitesFieldCountAggregator.calculate([fieldA, fieldB]);

        // ASSERT
        expect(count).toEqual(54 + 61);
    })

    it('with normal count fields, accumulates the count and skips undefined counts', () => {
        // ARRANGE
        const fieldA = FieldResponseObjectMother.getWithCount(54);
        const fieldB = FieldResponseObjectMother.getWithCount(undefined);

        // ACT
        const count = SitesFieldCountAggregator.calculate([fieldA, fieldB]);

        // ASSERT
        expect(count).toEqual(54);
    })

    it('with discrete count fields, accumulates the count of each token', () => {
        // ARRANGE
        const fieldA = FieldResponseObjectMother.getWithCount([
            DiscreteVariableCountReponseObjectMother.get('labelA', 34),
            DiscreteVariableCountReponseObjectMother.get('labelB', 45),
        ]);
        const fieldB = FieldResponseObjectMother.getWithCount([
            DiscreteVariableCountReponseObjectMother.get('labelA', 27),
            DiscreteVariableCountReponseObjectMother.get('labelB', 31),
        ]);;

        // ACT
        const count = SitesFieldCountAggregator.calculate([fieldA, fieldB]);

        // ASSERT
        expect(count).toEqual([
            DiscreteVariableCountReponseObjectMother.get('labelA', 34 + 27),
            DiscreteVariableCountReponseObjectMother.get('labelB', 31 + 45),
        ]);
    })
})