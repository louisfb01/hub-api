export default interface HubPrepareResponse {
    siteCode: string;
    job: string;
    query?: string;
    count: string;
    model: string;
    weights: any;
    error?: string;
}