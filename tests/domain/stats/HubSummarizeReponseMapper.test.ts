import HubSummarizeReponseMapper from "../../../src/domain/stats/HubSummarizeReponseMapper";
import SiteSummarizeResponseObjectMother from "../../utils/objectMothers/models/response/SiteSummarizeResponseObjectMother";
import WebSocketBusEventResultObjectMother from "../../utils/objectMothers/websocket/WebSocketBusEventResultObjectMother";

describe('HubSummarizeReponseMapper tests', () => {

    it('maps site error', () => {
        // ARRANGE
        const siteResponse = SiteSummarizeResponseObjectMother.getWithError('error');
        const eventResult = WebSocketBusEventResultObjectMother.get([siteResponse]);

        // ACT
        const hubResponses = HubSummarizeReponseMapper.getMapped(eventResult);

        // ASSERT
        expect(hubResponses.length).toEqual(1);

        const hubResponse = hubResponses[0];
        expect(hubResponse.siteCode).toEqual(eventResult.siteCode);
        expect(hubResponse.error).toEqual(siteResponse.error);
    })

    it('maps site number, fields and breakdown', () => {
        // ARRANGE
        const siteResponse = SiteSummarizeResponseObjectMother.get(99);
        const eventResult = WebSocketBusEventResultObjectMother.get([siteResponse]);

        // ACT
        const hubResponses = HubSummarizeReponseMapper.getMapped(eventResult);

        // ASSERT
        expect(hubResponses.length).toEqual(1);

        const hubResponse = hubResponses[0];
        expect(hubResponse.siteCode).toEqual(eventResult.siteCode);
        expect(hubResponse.total).toEqual(siteResponse.total);
        expect(hubResponse.breakdown).toEqual(siteResponse.breakdown);
        expect(hubResponse.results).toEqual(siteResponse.fieldResponses);
    })

    it('maps multiple sites', () => {
        // ARRANGE
        const siteResponseA = SiteSummarizeResponseObjectMother.get(99);
        const siteResponseB = SiteSummarizeResponseObjectMother.get(99);
        const eventResult = WebSocketBusEventResultObjectMother.get([siteResponseA, siteResponseB]);

        // ACT
        const hubResponses = HubSummarizeReponseMapper.getMapped(eventResult);

        // ASSERT
        expect(hubResponses.length).toEqual(2);
    })
})