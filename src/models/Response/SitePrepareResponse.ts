export default interface SitePrepareResponse {
    count: string;
    model: string;
    weights: any;
    job: string;
    query?: string;
    error?: string;
}