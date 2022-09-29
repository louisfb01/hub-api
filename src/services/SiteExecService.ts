import HubInfo from "../models/HubInfo";
import _ from 'underscore';

import WebSocketBusEventResult from "../websocket/WebSocketBusEventResult";
import ExecInfo from "../models/ExecInfo";

// Process multi-site info.
function process(results: ExecInfo[]) : HubInfo {
    const now = { last_seen: new Date() };
    const conns : ExecInfo[] = results.map(r => Object.assign(_.clone(r), now));

    return {
        connections: conns,
        api_version: "1.0.1",
    }
}

// Removes failed sites.
function unwrap(webSocketResults: WebSocketBusEventResult<ExecInfo>[]): HubInfo {
    return process(webSocketResults.filter(wsr => wsr.succeeded).map(wsr => wsr.result));
}

export default {
    unwrap
}