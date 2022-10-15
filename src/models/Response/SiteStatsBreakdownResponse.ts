import BreakdownResponse from "./BreakdownResponse";

export default interface SiteStatsBreakdownResponse {
    job: string;
    query: string;
    result: BreakdownResponse[];
    error?: string;
}