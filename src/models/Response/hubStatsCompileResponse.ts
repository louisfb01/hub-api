import BreakdownResponse from "./BreakdownResponse";
import FieldResponse from "./FieldResponse";

export default interface HubStatsCompileResponse {
    siteCode: string;
    job: string;
    total: number;
    query?: string;
    results: FieldResponse[];
    breakdown?: BreakdownResponse;
    error?: string;
}