export default interface BreakdownResponse {
    fieldType: string;
    field: string;
    query: string;
    result: { periodStart: string, periodCount: number }[];
}