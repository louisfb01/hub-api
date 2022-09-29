import { when } from "jest-when";
import Constants from "../../../src/Constants";
import AllSitesFieldsMapper from "../../../src/domain/stats/AllSitesFieldsMapper";
import AllSitesResponseMapper from "../../../src/domain/stats/AllSitesResponseMapper";
import SitesBreakdownAggregator from "../../../src/domain/stats/SitesBreakdownAggregator";
import FieldReponse from "../../../src/models/Response/FieldResponse";
import BreakdownResponseObjectMother from "../../utils/objectMothers/models/response/BreakdownResponseObjectMother";
import HubSummarizeResponseObjectMother from "../../utils/objectMothers/models/response/HubSummarizeResponseObjectMother";

describe('AllSitesResponseMapper tests', () => {
    it('for one query per site, all site code, site query total and site query attributed to all site query', () => {
        // ARRANGE
        const siteAReponseA = HubSummarizeResponseObjectMother.get(34, []);
        const siteBReponseA = HubSummarizeResponseObjectMother.get(72, []);

        const siteReponses = [[siteAReponseA], [siteBReponseA]];

        const siteFieldsMapped = new Array<FieldReponse>();
        AllSitesFieldsMapper.getMapped = jest.fn();
        when(AllSitesFieldsMapper.getMapped as any)
            .calledWith([siteAReponseA, siteBReponseA])
            .mockReturnValue(siteFieldsMapped);

        // ACT
        const allSiteReponse = AllSitesResponseMapper.getMapped(siteReponses);

        // ASSERT
        expect(allSiteReponse.length).toEqual(1);

        expect(allSiteReponse[0].siteCode).toEqual(Constants.AllSitesName);
        expect(allSiteReponse[0].total).toEqual(34 + 72);
        expect(allSiteReponse[0].results).toBe(siteFieldsMapped);
    })

    it('for two queries per site, all site code, site query totals and site queries to all site queries', () => {
        // ARRANGE
        const siteAReponseA = HubSummarizeResponseObjectMother.get(34, []);
        const siteAReponseB = HubSummarizeResponseObjectMother.get(54, []);
        const siteBReponseA = HubSummarizeResponseObjectMother.get(72, []);
        const siteBReponseB = HubSummarizeResponseObjectMother.get(99, []);

        const siteReponses = [[siteAReponseA, siteAReponseB], [siteBReponseA, siteBReponseB]];

        const siteResponseAFieldsMapped = new Array<FieldReponse>();
        const siteResponseBFieldsMapped = new Array<FieldReponse>();

        AllSitesFieldsMapper.getMapped = jest.fn();
        when(AllSitesFieldsMapper.getMapped as any)
            .calledWith([siteAReponseA, siteBReponseA])
            .mockReturnValue(siteResponseAFieldsMapped)
            .calledWith([siteAReponseB, siteBReponseB])
            .mockReturnValue(siteResponseBFieldsMapped);

        // ACT
        const allSiteReponse = AllSitesResponseMapper.getMapped(siteReponses);

        // ASSERT
        expect(allSiteReponse.length).toEqual(2);

        expect(allSiteReponse[0].siteCode).toEqual(Constants.AllSitesName);
        expect(allSiteReponse[0].total).toEqual(34 + 72);
        expect(allSiteReponse[0].results).toBe(siteResponseAFieldsMapped);

        expect(allSiteReponse[1].siteCode).toEqual(Constants.AllSitesName);
        expect(allSiteReponse[1].total).toEqual(54 + 99);
        expect(allSiteReponse[1].results).toBe(siteResponseBFieldsMapped);
    })

    it('for one query per site, all site code, breakdowns are aggregated', () => {
        // ARRANGE
        const siteAReponseA = HubSummarizeResponseObjectMother.get(34, [], BreakdownResponseObjectMother.get());
        const siteBReponseA = HubSummarizeResponseObjectMother.get(72, [], BreakdownResponseObjectMother.get());

        const siteReponses = [[siteAReponseA], [siteBReponseA]];

        const siteFieldsMapped = new Array<FieldReponse>();
        AllSitesFieldsMapper.getMapped = jest.fn();
        when(AllSitesFieldsMapper.getMapped as any)
            .calledWith([siteAReponseA, siteBReponseA])
            .mockReturnValue(siteFieldsMapped);

        const breakdownAggregated = BreakdownResponseObjectMother.get();
        SitesBreakdownAggregator.getBreakdownsAggregated = jest.fn();
        when(SitesBreakdownAggregator.getBreakdownsAggregated as any)
            .calledWith([siteAReponseA, siteBReponseA])
            .mockReturnValue(breakdownAggregated);

        // ACT
        const allSiteReponse = AllSitesResponseMapper.getMapped(siteReponses);

        // ASSERT
        expect(allSiteReponse.length).toEqual(1);

        expect(allSiteReponse[0].breakdown).toEqual(breakdownAggregated);
    })
})