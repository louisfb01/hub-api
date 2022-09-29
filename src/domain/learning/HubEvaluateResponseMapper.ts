import HubEvaluateResponse from "../../models/Response/HubEvaluateResponse";
import SiteEvaluateResponse from "../../models/Response/SiteEvaluateResponse";
import WebSocketBusEventResult from "../../websocket/WebSocketBusEventResult";

function getMapped(siteReponse: WebSocketBusEventResult<SiteEvaluateResponse>): HubEvaluateResponse {
    return {
        metrics: siteReponse.result.metrics,
        siteCode: siteReponse.siteCode,
        error: siteReponse.result.error
    }
}

export default {
    getMapped
}