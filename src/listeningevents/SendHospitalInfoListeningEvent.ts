import HospitalInfo from "../models/HospitalInfo";
import webSocketBus from "../websocket/WebSocketBus";
import WebSocketEventListener from "../websocket/WebSocketEventListener";

export default class SendHospitalInfoListeningEvent implements WebSocketEventListener {
    listeningEvent: string;

    constructor() {
        this.listeningEvent = 'sendHospitalInfo';
    }

    callback(args: { clientId: string, eventId: string, siteCode: string, hospitalInfo: HospitalInfo }) {
        // For now the contexte of this is lost during the function execution of this statement. so this.listeningEvent is not accessible.
        webSocketBus.registerResultEvent(args.clientId, args.eventId, 'sendHospitalInfo', args.siteCode, args.hospitalInfo);
    }
}