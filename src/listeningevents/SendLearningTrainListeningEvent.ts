import SiteInfo from "../models/SiteInfo";
import webSocketBus from "../websocket/WebSocketBus";
import WebSocketEventListener from "../websocket/WebSocketEventListener";

export default class SendLearningTrainListeningEvent implements WebSocketEventListener {
    listeningEvent: string;

    constructor() {
        this.listeningEvent = 'sendLearningTrain';
    }

    callback(args: { clientId: string, eventId: string, siteCode: string, siteInfo: SiteInfo }) {
        // For now the contexte of this is lost during the function execution of this statement. so this.listeningEvent is not accessible.
        webSocketBus.registerResultEvent(args.clientId, args.eventId, 'sendLearningTrain', args.siteCode, args.siteInfo);
    }
}