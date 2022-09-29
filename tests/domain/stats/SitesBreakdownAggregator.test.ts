import HubSummarizeResponseObjectMother from "../../utils/objectMothers/models/response/HubSummarizeResponseObjectMother";
import SitesBreakdownAggregator from "../../../src/domain/stats/SitesBreakdownAggregator";
import BreakdownResponseObjectMother from "../../utils/objectMothers/models/response/BreakdownResponseObjectMother";
import BreakdownResultObjectMother from "../../utils/objectMothers/models/response/BreakdownResultObjectMother";


describe('SitesBreakdownAggregator tests', () => {
    it('With two site responses, both without breakdowns, returned undefined', () => {
        // ARRANGE
        const siteAHubResponse = HubSummarizeResponseObjectMother.get();
        const siteBHubResponse = HubSummarizeResponseObjectMother.get();

        // ACT
        const allSiteBreakdown = SitesBreakdownAggregator.getBreakdownsAggregated([siteAHubResponse, siteBHubResponse]);

        // ASSERT
        expect(allSiteBreakdown).toBeUndefined();
    })

    it('With two site responses, both breakdowns have two results each, results are aggregated', () => {
        // ARRANGE
        const siteAHubResponse = getHubResponseFromBreakdownResults([
            BreakdownResultObjectMother.get('2014-1-1', 4),
            BreakdownResultObjectMother.get('2014-1-2', 5),
        ]);
        const siteBHubResponse = getHubResponseFromBreakdownResults([
            BreakdownResultObjectMother.get('2014-1-1', 3),
            BreakdownResultObjectMother.get('2014-1-2', 8),
        ]);;

        // ACT
        const allSiteBreakdown = SitesBreakdownAggregator.getBreakdownsAggregated([siteAHubResponse, siteBHubResponse]);

        // ASSERT
        expect(allSiteBreakdown).toEqual({
            query: siteAHubResponse.breakdown?.query,
            result: [
                BreakdownResultObjectMother.get('2014-1-1', 7),
                BreakdownResultObjectMother.get('2014-1-2', 13),
            ]
        });
    })

    function getHubResponseFromBreakdownResults(results: { periodStart: string, periodCount: number }[]) {
        const breakdown = BreakdownResponseObjectMother.get(results);
        return HubSummarizeResponseObjectMother.get(1, [], breakdown);
    }
})