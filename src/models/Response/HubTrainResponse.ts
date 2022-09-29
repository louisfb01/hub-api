export default interface HubTrainResponse {
    metrics: any;
    siteCode: string;
    job: string;
    weights?: any;
    error?: string;
}