import BreakdownResponse from "./BreakdownResponse";
import FieldResponse from "./FieldResponse";

export default interface SiteStatsCompileResponse {
    job: string;
    total: number;
    fieldResponses: FieldResponse[];
    query?: string;
    breakdown?: BreakdownResponse;
    error?: string;
}