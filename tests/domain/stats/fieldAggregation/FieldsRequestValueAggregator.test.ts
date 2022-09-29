import { when } from "jest-when";
import FieldsRequestValueAggregator from "../../../../src/domain/stats/fieldAggregation/FieldsRequestValueAggregator";
import SitesFieldConfidenceIntevalAggregator from "../../../../src/domain/stats/fieldAggregation/SitesFieldConfidenceIntevalAggregator";
import SitesFieldCountAggregator from "../../../../src/domain/stats/fieldAggregation/SitesFieldCountAggregator";
import SitesFieldMarginalAggregator from "../../../../src/domain/stats/fieldAggregation/SitesFieldMarginalAggregator";
import SitesFieldMeanAggregator from "../../../../src/domain/stats/fieldAggregation/SitesFieldMeanAggregator";
import SitesFieldModeAggregator from "../../../../src/domain/stats/fieldAggregation/SitesFieldModeAggregator";
import SitesFieldStandardDeviationAggregator from "../../../../src/domain/stats/fieldAggregation/SitesFieldStandardDeviationAggregator";
import FieldResponseObjectMother from "../../../utils/objectMothers/models/response/FieldResponseObjectMother";

describe('FieldsRequestValueAggregator tests', () => {
    beforeEach

    it('with no values in fields, no value calculated for field', () => {
        // ARRANGE
        const fieldA = FieldResponseObjectMother.getWithFieldValue('field', {});
        const fieldB = FieldResponseObjectMother.getWithFieldValue('field', {});
        const fields = [fieldA, fieldB];

        // ACT
        const fieldValues = FieldsRequestValueAggregator.aggregateFieldValues(fields);

        // ASSERT
        expect(fieldValues.length).toEqual(0);
    })

    const testParams = [
        { value: 42, fieldAndValue: { mean: 42 }, calculator: SitesFieldMeanAggregator },
        { value: 43, fieldAndValue: { stdev: 43 }, calculator: SitesFieldStandardDeviationAggregator },
        { value: 44, fieldAndValue: { ci95: 44 }, calculator: SitesFieldConfidenceIntevalAggregator },
        { value: 45, fieldAndValue: { count: 45 }, calculator: SitesFieldCountAggregator },
        { value: 46, fieldAndValue: { mode: 46 }, calculator: SitesFieldModeAggregator },
        { value: 47, fieldAndValue: { marginal: 47 }, calculator: SitesFieldMarginalAggregator },
    ]

    testParams.forEach(tp => {
        it('with value contained in field, one field, appropriate calculator is used to compute value', () => {
            // ARRANGE
            const field = FieldResponseObjectMother.getWithFieldValue('field', tp.fieldAndValue);
            const fields = [field];

            tp.calculator.calculate = jest.fn();
            when(tp.calculator.calculate as any)
                .calledWith(fields)
                .mockReturnValue(tp.value);

            // ACT
            const fieldValues = FieldsRequestValueAggregator.aggregateFieldValues(fields);

            // ASSERT
            expect(fieldValues[0]).toEqual(tp.fieldAndValue);
        })

        it('with two fields, value only in second field, appropriate calculator is used to compute value', () => {
            // ARRANGE
            const fieldNoValue = FieldResponseObjectMother.getWithFieldValue('field', {});
            const fieldWithValue = FieldResponseObjectMother.getWithFieldValue('field', tp.fieldAndValue);
            const fields = [fieldNoValue, fieldWithValue];

            tp.calculator.calculate = jest.fn();
            when(tp.calculator.calculate as any)
                .calledWith(fields)
                .mockReturnValue(tp.value);

            // ACT
            const fieldValues = FieldsRequestValueAggregator.aggregateFieldValues(fields);

            // ASSERT
            expect(fieldValues[0]).toEqual(tp.fieldAndValue);
        })
    })

    it('with multiple values in fields, values are calculated for field', () => {
        // ARRANGE
        const fieldA = FieldResponseObjectMother.getWithFieldValue('field', { mean: 3, count: 5 });
        const fieldB = FieldResponseObjectMother.getWithFieldValue('field', { mean: 6, count: 10 });
        const fields = [fieldA, fieldB];

        SitesFieldMeanAggregator.calculate = jest.fn();
        when(SitesFieldMeanAggregator.calculate as any)
            .calledWith(fields)
            .mockReturnValue(5);

        SitesFieldCountAggregator.calculate = jest.fn();
        when(SitesFieldCountAggregator.calculate as any)
            .calledWith(fields)
            .mockReturnValue(15);

        // ACT
        const fieldValues = FieldsRequestValueAggregator.aggregateFieldValues(fields);

        // ASSERT
        expect(fieldValues[0]).toEqual({ ['mean']: 5 });
        expect(fieldValues[1]).toEqual({ ['count']: 15 });
    })

})