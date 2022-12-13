export default interface HubPrepareResponse {
    siteCode: string;
    job: string;
    query?: string;
    count: string;
    model: string;
    error?: string;
}