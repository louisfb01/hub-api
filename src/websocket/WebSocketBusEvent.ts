export default interface WebSocketBusEvent {
    clientId: string;
    eventId: string;
    awaitingEvent: string;
}