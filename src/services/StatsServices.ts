import AllSitesResponseMapper from "../domain/stats/AllSitesResponseMapper";
import HubSummarizeReponseMapper from "../domain/stats/HubSummarizeReponseMapper";
import SiteRequestResponse from "../models/Response/SiteRequestResponse";
import SiteStatsCompileResponse from "../models/Response/SiteStatsCompileResponse";
import SiteStatsProgressResponse from "../models/Response/SiteStatsProgressResponse";
import SiteSummarizeResponse from "../models/Response/SiteSummarizeResponse";
import WebSocketBusEventResult from "../websocket/WebSocketBusEventResult";

function compileSummarize(webSocketResults: WebSocketBusEventResult<SiteSummarizeResponse[]>[], waitAllSites: boolean) {
    const hubResults = webSocketResults
        .filter(rw => waitAllSites || rw.succeeded)
        .map(rw => HubSummarizeReponseMapper.getResultsMapped(rw));

    if (hubResults.length === 0) return hubResults;
    
    const allSitesResult = AllSitesResponseMapper.getMapped(hubResults);
    hubResults.push(allSitesResult);

    return hubResults;
}

function compileRequest(webSocketResults: WebSocketBusEventResult<SiteRequestResponse[]>[], waitAllSites: boolean) {
    const hubResults = webSocketResults
        .filter(rw => waitAllSites || rw.succeeded)
        .map(rw => HubSummarizeReponseMapper.getRequestMapped(rw));

    if (hubResults.length === 0) return hubResults;

    return hubResults;
}


function compileProgress(webSocketResults: WebSocketBusEventResult<SiteStatsProgressResponse>[], waitAllSites: boolean) {
    const hubResults = webSocketResults
        .filter(rw => waitAllSites || rw.succeeded)
        .map(rw => HubSummarizeReponseMapper.getProgressMapped(rw));

    if (hubResults.length === 0) return hubResults;

    return hubResults;
}

function compileResults(webSocketResults: WebSocketBusEventResult<SiteStatsCompileResponse[] | SiteSummarizeResponse[]>[], waitAllSites: boolean) {
    const hubResults = webSocketResults
        .filter(rw => waitAllSites || rw.succeeded)
        .map(rw => HubSummarizeReponseMapper.getResultsMapped(rw));

    if (hubResults.length === 0) return hubResults;

    const allSitesResult = AllSitesResponseMapper.getMapped(hubResults);
    hubResults.push(allSitesResult);

    return hubResults;
}

export default {
    compileResults, compileProgress, compileSummarize, compileRequest
}