import BreakdownResponse from "../../../../../src/models/Response/BreakdownResponse";
import FieldReponse from "../../../../../src/models/Response/FieldResponse"
import HubSummarizeResponse from "../../../../../src/models/Response/HubSummarizeResponse"

function get(total?: number, results?: FieldReponse[], breakdown?: BreakdownResponse): HubSummarizeResponse {
    total = total ?? 54;
    results = results ?? [];

    return {
        siteCode: 'siteCode',
        total,
        results,
        breakdown
    }
}

export default {
    get
}