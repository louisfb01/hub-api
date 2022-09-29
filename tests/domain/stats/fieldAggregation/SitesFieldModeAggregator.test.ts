import SitesFieldModeAggregator from "../../../../src/domain/stats/fieldAggregation/SitesFieldModeAggregator";
import DiscreteVariableCountReponseObjectMother from "../../../utils/objectMothers/models/response/DiscreteVariableCountReponseObjectMother";
import FieldResponseObjectMother from "../../../utils/objectMothers/models/response/FieldResponseObjectMother";

describe('SitesFieldModeAggregator tests', () => {
    it('with discrete count fields, total of tokens are cummulated and most numerous token is mode', () => {
        // ARRANGE
        const fieldA = FieldResponseObjectMother.getWithCount([
            DiscreteVariableCountReponseObjectMother.get('labelA', 54),
            DiscreteVariableCountReponseObjectMother.get('labelB', 45),
        ]);
        const fieldB = FieldResponseObjectMother.getWithCount([
            DiscreteVariableCountReponseObjectMother.get('labelA', 27),
            DiscreteVariableCountReponseObjectMother.get('labelB', 64),
        ]);;

        // ACT
        const mode = SitesFieldModeAggregator.calculate([fieldA, fieldB]);

        // ASSERT
        expect(mode).toEqual('labelB');
    })
})