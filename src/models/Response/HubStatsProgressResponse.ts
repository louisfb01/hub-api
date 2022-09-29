export default interface HubStatsProgressResponse {
    siteCode: string;
    job: string;
    ready: boolean;
    error?: string;
}