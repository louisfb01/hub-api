export default interface WebSocketBusEventResult<TResult> {
    clientId: string;
    eventId: string;
    event: string;
    result: TResult;
    succeeded: boolean;
    siteCode: string;
}