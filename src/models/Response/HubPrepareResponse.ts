export default interface HubPrepareResponse {
    siteCode: string;
    job: string;
    query?: string;
    count: string;
    totalCount: string;
    error?: string;
}