import FieldResponse from "./FieldResponse";
import SiteStatsBreakdownResponse from "./SiteStatsBreakdownResponse";

export default interface SiteSummarizeResponse {
    total: number;
    job: string;
    fieldResponses: FieldResponse[];
    query?: string;
    breakdown?: SiteStatsBreakdownResponse;
    error?: string;
}