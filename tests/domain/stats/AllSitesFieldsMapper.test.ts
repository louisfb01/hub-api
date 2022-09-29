import { when } from "jest-when";
import AllSitesFieldsMapper from "../../../src/domain/stats/AllSitesFieldsMapper";
import FieldsRequestValueAggregator from "../../../src/domain/stats/fieldAggregation/FieldsRequestValueAggregator";
import FieldResponseObjectMother from "../../utils/objectMothers/models/response/FieldResponseObjectMother"
import HubSummarizeResponseObjectMother from "../../utils/objectMothers/models/response/HubSummarizeResponseObjectMother";

describe('AllSitesFieldsMapper tests', () => {
    it('With two sites one field, fields aggregation are combined and mapped', () => {
        // ARRANGE
        const fieldASiteA = FieldResponseObjectMother.get('fieldA', 145);
        const siteResultA = HubSummarizeResponseObjectMother.get(145, [fieldASiteA]);

        const fieldASiteB = FieldResponseObjectMother.get('fieldA', 72);
        const siteResultB = HubSummarizeResponseObjectMother.get(72, [fieldASiteB]);

        FieldsRequestValueAggregator.aggregateFieldValues = jest.fn();
        when(FieldsRequestValueAggregator.aggregateFieldValues as any)
            .calledWith([fieldASiteA, fieldASiteB])
            .mockReturnValue([
                { 'count': 172 },
                { 'mean': 99 }
            ]);

        // ACT
        const allSiteFields = AllSitesFieldsMapper.getMapped([siteResultA, siteResultB]);

        // ASSERT
        expect(allSiteFields.length).toEqual(1);
        expect(allSiteFields[0]).toEqual({
            field: 'fieldA',
            count: 172,
            mean: 99
        });
    })

    it('With two sites two fields, fields aggregation are combined and mapped', () => {
        // ARRANGE
        const fieldASiteA = FieldResponseObjectMother.get('fieldA', 145);
        const fieldBSiteA = FieldResponseObjectMother.get('fieldB', 31);
        const siteResultA = HubSummarizeResponseObjectMother.get(145, [fieldASiteA, fieldBSiteA]);

        const fieldASiteB = FieldResponseObjectMother.get('fieldA', 72);
        const fieldBSiteB = FieldResponseObjectMother.get('fieldA', 56);
        const siteResultB = HubSummarizeResponseObjectMother.get(72, [fieldASiteB, fieldBSiteB]);

        FieldsRequestValueAggregator.aggregateFieldValues = jest.fn();
        when(FieldsRequestValueAggregator.aggregateFieldValues as any)
            .calledWith([fieldASiteA, fieldASiteB])
            .mockReturnValue([
                { 'count': 172 },
                { 'mean': 99 }
            ])
            .calledWith([fieldBSiteA, fieldBSiteB])
            .mockReturnValue([
                { 'count': 34 },
                { 'mean': 27 }
            ]);

        // ACT
        const allSiteFields = AllSitesFieldsMapper.getMapped([siteResultA, siteResultB]);

        // ASSERT
        expect(allSiteFields.length).toEqual(2);

        expect(allSiteFields[0]).toEqual({
            field: 'fieldA',
            count: 172,
            mean: 99
        });

        expect(allSiteFields[1]).toEqual({
            field: 'fieldB',
            count: 34,
            mean: 27
        });
    })
})