import BreakdownResponse from "./BreakdownResponse";

export default interface SiteStatsBreakdownResponse {
    job: string;
    query: string;
    breakdown: BreakdownResponse;
    error?: string;
}