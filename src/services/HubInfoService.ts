import HubInfo from "../models/HubInfo";
import SiteInfo from "../models/SiteInfo";
import WebSocketBusEventResult from "../websocket/WebSocketBusEventResult";
import _ from 'underscore';
import ConnInfo from "../models/ConnInfo";
import ExecInfo from "../models/ExecInfo";

type Info = SiteInfo | ExecInfo;

function addLastSeen(res: SiteInfo[]) : ConnInfo[] {
    return res.map(r => Object.assign(_.clone(r), { last_seen: new Date() }));
}

// Process multi-site info.
function process(results: Info[]) : HubInfo {

    if (results.length === 0) {
        return {
            connections: [],
            api_version: "1.0.1",
        }
    }

    const first = results[0];
    const conns = (first as ExecInfo).command ? results as ExecInfo[] : addLastSeen(results as SiteInfo[]);

    return {
        connections: conns,
        api_version: "1.0.1",
    }
}

// Removes failed sites.
function unwrap(webSocketResults: WebSocketBusEventResult<Info>[]): HubInfo {
    return process(webSocketResults.filter(wsr => wsr.succeeded).map(wsr => wsr.result));
}

export default {
    unwrap
}