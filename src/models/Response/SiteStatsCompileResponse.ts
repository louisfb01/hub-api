import SiteStatsBreakdownResponse from "./SiteStatsBreakdownResponse";
import FieldResponse from "./FieldResponse";

export default interface SiteStatsCompileResponse {
    job: string;
    total: number;
    fieldResponses: FieldResponse[];
    query?: string;
    breakdown?: SiteStatsBreakdownResponse;
    error?: string;
}