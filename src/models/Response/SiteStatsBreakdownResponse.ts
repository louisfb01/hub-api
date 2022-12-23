export default interface SiteStatsBreakdownResponse {
    job: string;
    query: string;
    result: { periodStart: string, periodCount: number | null }[];
    field: string;
    fieldType: string;
}