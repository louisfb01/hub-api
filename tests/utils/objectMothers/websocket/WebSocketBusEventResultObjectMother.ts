import WebSocketBusEventResult from "../../../../src/websocket/WebSocketBusEventResult";

function get<TResult>(result: TResult): WebSocketBusEventResult<TResult> {
    return {
        clientId: 'clientId',
        event: 'event',
        eventId: 'eventId',
        siteCode: '110',
        succeeded: true,
        result
    }
}

export default {
    get
}