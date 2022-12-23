import FieldReponse from "../../../../../src/models/Response/FieldResponse"
import HubSummarizeResponse from "../../../../../src/models/Response/HubSummarizeResponse"
import SiteStatsBreakdownResponse from "../../../../../src/models/Response/SiteStatsBreakdownResponse";

function get(total?: number, results?: FieldReponse[], breakdown?: SiteStatsBreakdownResponse): HubSummarizeResponse {
    total = total ?? 54;
    results = results ?? [];

    return {
        siteCode: 'siteCode',
        total,
        results,
        breakdown,
        job: 'a'
    }
}

export default {
    get
}