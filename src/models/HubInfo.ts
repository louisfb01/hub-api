import ConnInfo from "./ConnInfo";
import ExecInfo from "./ExecInfo";

type SiteReturn = ExecInfo | ConnInfo;
export default interface HubInfo {
    connections: SiteReturn[];
    api_version: "1.0.1";
}