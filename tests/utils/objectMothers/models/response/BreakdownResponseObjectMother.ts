import SiteStatsBreakdownResponse from "../../../../../src/models/Response/SiteStatsBreakdownResponse"

function get(result: { periodStart: string, periodCount: number }[] = []): SiteStatsBreakdownResponse {
    return {
        query: 'SELECT * FROM PATIENT',
        result,
        job:"a",
        field: "age",
        fieldType: "type"
    }
}

export default {
    get
}