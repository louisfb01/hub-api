import BreakdownResponse from "../../../../../src/models/Response/BreakdownResponse"

function get(result: { periodStart: string, periodCount: number }[] = []): BreakdownResponse {
    return {
        query: 'SELECT * FROM PATIENT',
        result
    }
}

export default {
    get
}