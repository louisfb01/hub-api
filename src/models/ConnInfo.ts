import SiteInfo from "./SiteInfo";

export default interface ConnInfo extends SiteInfo {
    last_seen: Date;
}