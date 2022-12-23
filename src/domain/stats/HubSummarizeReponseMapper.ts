import HubRequestResponse from "../../models/Response/HubRequestResponse";
import HubStatsCompileResponse from "../../models/Response/hubStatsCompileResponse";
import HubStatsProgressResponse from "../../models/Response/HubStatsProgressResponse";
import HubSummarizeResponse from "../../models/Response/HubSummarizeResponse";
import SiteRequestResponse from "../../models/Response/SiteRequestResponse";
import SiteStatsBreakdownResponse from "../../models/Response/SiteStatsBreakdownResponse";
import SiteStatsCompileResponse from "../../models/Response/SiteStatsCompileResponse";
import SiteStatsProgressResponse from "../../models/Response/SiteStatsProgressResponse";
import SiteSummarizeResponse from "../../models/Response/SiteSummarizeResponse";
import WebSocketBusEventResult from "../../websocket/WebSocketBusEventResult";

function getResultsMapped(siteReponse: WebSocketBusEventResult<SiteStatsCompileResponse[]| SiteSummarizeResponse[]>): HubStatsCompileResponse[] | HubSummarizeResponse[] {
    const results = toArray(siteReponse)
    return results.map(sr => {
        return {
            siteCode: siteReponse.siteCode,
            job: sr.job,
            total: sr.total,
            query: sr.query,
            breakdown: sr.breakdown,
            results: sr.fieldResponses,
            error: sr.error
        }
    })
}

function getRequestMapped(siteReponse: WebSocketBusEventResult<SiteRequestResponse[]>): HubRequestResponse[] {
    const results = toArray(siteReponse)
    return results.map(sr => {
        return {
            siteCode: siteReponse.siteCode,
            job: sr.job,
            error: sr.error
        }
    })
}

function getProgressMapped(siteReponse: WebSocketBusEventResult<SiteStatsProgressResponse>): HubStatsProgressResponse {
    const sr = siteReponse.result
    return {
        job: sr.job,
        siteCode: siteReponse.siteCode,
        ready: sr.ready,
        error: sr.error
    }
}

function toArray(obj:WebSocketBusEventResult<any[]>){
    if (obj.result instanceof Array) {
        return obj.result;
    } else {
        return [obj.result];
    }
}

function getCI95Result(siteReponse: WebSocketBusEventResult<SiteStatsCompileResponse[]| SiteSummarizeResponse[]>, body:any) {
    const breakdownAttribute = body.selectors[0].breakdown.resource.field
    const results = toArray(siteReponse)
    return results.map(sr => {
        return sr.fieldResponses.find((fr: any) => { return fr.field == breakdownAttribute }).ci95
    })
}

function getBreakdownMapped(
    siteBreakdown: WebSocketBusEventResult<SiteStatsBreakdownResponse>[], 
    webSocketResults: WebSocketBusEventResult<SiteStatsCompileResponse[]| SiteSummarizeResponse[]>[]){

    webSocketResults.forEach(wsr => {
        const results = toArray(wsr);
        return results.forEach(sr => {
            const siteBreakdownResult = siteBreakdown.find((sb:WebSocketBusEventResult<SiteStatsBreakdownResponse>) => sb.siteCode == wsr.siteCode);
            if(siteBreakdownResult){
                sr.breakdown = {
                    result:siteBreakdownResult.result.result,
                    field:siteBreakdownResult.result.field,
                    fieldType:siteBreakdownResult.result.fieldType

                };
            }
        })
    })
}

export default {
    getResultsMapped, getRequestMapped, getProgressMapped, getCI95Result, getBreakdownMapped
}