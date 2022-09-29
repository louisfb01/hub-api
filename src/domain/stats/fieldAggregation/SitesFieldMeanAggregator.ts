import FieldResponse from "../../../models/Response/FieldResponse";

function calculate(specificFieldResponses: FieldResponse[]) {
    const sitesTotal = specificFieldResponses.reduce((count: number, currentValue: FieldResponse) => {
        const possibleFieldCount = currentValue.mean?.populationSize as number;
        const fieldCount = possibleFieldCount ?? 0;

        return count + fieldCount;
    }, 0);

    const aggregatedMean = specificFieldResponses.reduce((mean: number, currentValue: FieldResponse) => {
        const siteFieldMean = currentValue.mean?.mean as number;
        const siteFieldTotal = currentValue.mean?.populationSize as number;

        if (!siteFieldMean) {
            return mean;
        }

        const poderatedMean = (siteFieldMean * siteFieldTotal) / sitesTotal;

        return mean + poderatedMean;
    }, 0);

    return {mean: aggregatedMean, populationSize: sitesTotal}
}

export default {
    calculate
}