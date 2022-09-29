import HubTrainResponse from "../../models/Response/HubTrainResponse";
import SiteTrainResponse from "../../models/Response/SiteTrainResponse";
import WebSocketBusEventResult from "../../websocket/WebSocketBusEventResult";

function getMapped(siteReponse: WebSocketBusEventResult<SiteTrainResponse>): HubTrainResponse {
    return {
        metrics: siteReponse.result.metrics,
        siteCode: siteReponse.siteCode,
        job: siteReponse.result.job,
        weights: siteReponse.result.weights,
        error: siteReponse.result.error
    }
}

export default {
    getMapped
}