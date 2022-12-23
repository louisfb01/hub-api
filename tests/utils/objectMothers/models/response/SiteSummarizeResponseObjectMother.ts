import FieldResponse from "../../../../../src/models/Response/FieldResponse";
import SiteSummarizeResponse from "../../../../../src/models/Response/SiteSummarizeResponse";
import BreakdownReponseObjectMother from "./BreakdownResponseObjectMother";

function get(total: number, fieldResponses?: FieldResponse[]): SiteSummarizeResponse {
    fieldResponses = fieldResponses ?? [];

    return {
        total,
        fieldResponses,
        breakdown: BreakdownReponseObjectMother.get(),
        job: 'a'
    }
}

function getWithError(error: string): SiteSummarizeResponse {
    return {
        total: 0,
        fieldResponses: [],
        error,
        job: 'a'
    }
}

export default {
    get,
    getWithError
}