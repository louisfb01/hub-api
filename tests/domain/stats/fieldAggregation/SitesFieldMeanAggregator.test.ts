import SitesFieldMeanAggregator from "../../../../src/domain/stats/fieldAggregation/SitesFieldMeanAggregator";
import FieldResponseObjectMother from "../../../utils/objectMothers/models/response/FieldResponseObjectMother"

describe('SitesFieldMeanAggregator tests', () => {
    it('with normal count fields, calculated ponderated mean from means', () => {
        // ARRANGE
        const fieldA = FieldResponseObjectMother.getWithMean(54, 100);
        const fieldB = FieldResponseObjectMother.getWithMean(80, 10);

        // ACT
        const mean = SitesFieldMeanAggregator.calculate([fieldA, fieldB]);

        // ASSERT
        const expectedMean = ((54 * 100) / 110) + ((80 * 10) / 110);
        expect(mean).toEqual(expectedMean);
    })

    it('with normal mean fields, accumulates the means and skips undefined means', () => {
        // ARRANGE
        const fieldA = FieldResponseObjectMother.getWithMean(54, 100);
        const fieldB = FieldResponseObjectMother.getWithCount(10);

        // ACT
        const mean = SitesFieldMeanAggregator.calculate([fieldA, fieldB]);

        // ASSERT
        expect(mean).toEqual(54);
    })
})