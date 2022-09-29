import FieldReponse from "../../models/Response/FieldResponse";
import HubSummarizeResponse from "../../models/Response/HubSummarizeResponse";
import FieldsRequestValueAggregator from "./fieldAggregation/FieldsRequestValueAggregator";

function getSpecificFieldMapped(sameFieldsFromSites: FieldReponse[]): FieldReponse {
    const field = {
        field: sameFieldsFromSites[0].field,
        measure: sameFieldsFromSites[0].measure
    };

    const fieldValues = FieldsRequestValueAggregator.aggregateFieldValues(sameFieldsFromSites);
    return Object.assign(field, ...fieldValues);
}

function getMapped(siteSummarizeReponses: HubSummarizeResponse[]): FieldReponse[] {
    const allSpecificFieldsCombined = new Array<Array<FieldReponse>>();

    // Group specific fields for all sites in same array group aka invert site responses fields matrix column & rows.
    for (let fieldIndex = 0; fieldIndex < siteSummarizeReponses[0].results.length; fieldIndex++) {
        const sameFieldForAllSites = new Array<FieldReponse>();

        siteSummarizeReponses.forEach(siteResponses => {
            const specificSiteField = siteResponses.results[fieldIndex];
            sameFieldForAllSites.push(specificSiteField);
        });

        allSpecificFieldsCombined.push(sameFieldForAllSites);
    }

    return allSpecificFieldsCombined.map(asfc => getSpecificFieldMapped(asfc));
}

export default {
    getMapped
}