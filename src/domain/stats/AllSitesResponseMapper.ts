import Constants from "../../Constants";
import HubStatsCompileResponse from "../../models/Response/hubStatsCompileResponse";
import HubSummarizeResponse from "../../models/Response/HubSummarizeResponse";
import AllSitesFieldsMapper from "./AllSitesFieldsMapper";
import SitesBreakdownAggregator from "./SitesBreakdownAggregator";

function getSpecificRequestMapped(siteRequestSummarizeReponses: HubStatsCompileResponse[] | HubSummarizeResponse[]): HubStatsCompileResponse | HubSummarizeResponse {
    const siteResponsesTotalCalculator = (accumulator: number, currentSite: HubStatsCompileResponse | HubSummarizeResponse) => {
        return accumulator + currentSite.total;
    }

    return {
        siteCode: Constants.AllSitesName,
        job: siteRequestSummarizeReponses[0].job,
        total: siteRequestSummarizeReponses.reduce(siteResponsesTotalCalculator, 0),
        query: siteRequestSummarizeReponses[0].query,
        results: AllSitesFieldsMapper.getMapped(siteRequestSummarizeReponses),
        breakdown: SitesBreakdownAggregator.getBreakdownsAggregated(siteRequestSummarizeReponses)
    };
}

function getMapped(siteSummarizeReponses: HubStatsCompileResponse[][] | HubSummarizeResponse[][]): HubStatsCompileResponse[] | HubSummarizeResponse[]{
    const allSiteSpecificRequests = new Array<Array<HubStatsCompileResponse | HubSummarizeResponse>>();

    // Group specific requests for all sites in same array group aka invert site response matrix column & rows.
    for (let requestIndex = 0; requestIndex < siteSummarizeReponses[0].length; requestIndex++) {
        const specificRequestsForAllSites = new Array<HubStatsCompileResponse | HubSummarizeResponse>();

        siteSummarizeReponses.forEach(siteResponses => {
            const specificReponse = siteResponses[requestIndex];
            specificRequestsForAllSites.push(specificReponse);
        });

        allSiteSpecificRequests.push(specificRequestsForAllSites);
    }

    return allSiteSpecificRequests.map(asr => getSpecificRequestMapped(asr));
}

export default {
    getMapped
}