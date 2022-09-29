import BreakdownResponse from "./BreakdownResponse";
import FieldResponse from "./FieldResponse";

export default interface SiteSummarizeResponse {
    total: number;
    job: string;
    fieldResponses: FieldResponse[];
    query?: string;
    breakdown?: BreakdownResponse;
    error?: string;
}