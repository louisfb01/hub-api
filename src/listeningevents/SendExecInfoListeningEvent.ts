import ExecInfo from "../models/ExecInfo";
import SiteInfo from "../models/SiteInfo";
import webSocketBus from "../websocket/WebSocketBus";
import WebSocketEventListener from "../websocket/WebSocketEventListener";

export default class SendSiteInfoListeningEvent implements WebSocketEventListener {
    listeningEvent: string;

    constructor() {
        this.listeningEvent = 'sendExecInfo';
    }

    callback(args: { clientId: string, eventId: string, siteCode: string, execInfo: ExecInfo }) {
        // For now the contexte of this is lost during the function execution of this statement. so this.listeningEvent is not accessible.
        webSocketBus.registerResultEvent(args.clientId, args.eventId, 'sendExecInfo', args.siteCode, args.execInfo);
    }
}