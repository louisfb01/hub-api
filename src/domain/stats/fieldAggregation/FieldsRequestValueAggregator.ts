import FieldResponse from "../../../models/Response/FieldResponse";
import SitesFieldConfidenceIntevalAggregator from "./SitesFieldConfidenceIntevalAggregator";
import SitesFieldCountAggregator from "./SitesFieldCountAggregator";
import SitesFieldMarginalAggregator from "./SitesFieldMarginalAggregator";
import SitesFieldMeanAggregator from "./SitesFieldMeanAggregator";
import SitesFieldModeAggregator from "./SitesFieldModeAggregator";
import SitesFieldStandardDeviationAggregator from "./SitesFieldStandardDeviationAggregator";

const concernedFieldValue = ['mean', 'stdev', 'ci95', 'count', 'mode', 'marginal'];

function getCalculatorsForFieldValues() {
    const calculatorsForFieldValue = new Map<string, (specificFieldResponses: FieldResponse[]) => any>();

    calculatorsForFieldValue.set('mean', SitesFieldMeanAggregator.calculate);
    calculatorsForFieldValue.set('stdev', SitesFieldStandardDeviationAggregator.calculate);
    calculatorsForFieldValue.set('ci95', SitesFieldConfidenceIntevalAggregator.calculate);
    calculatorsForFieldValue.set('count', SitesFieldCountAggregator.calculate);
    calculatorsForFieldValue.set('mode', SitesFieldModeAggregator.calculate);
    calculatorsForFieldValue.set('marginal', SitesFieldMarginalAggregator.calculate);

    return calculatorsForFieldValue;
}



function aggregateFieldValues(specificFieldResponses: FieldResponse[]): { [key: string]: any }[] {
    const fieldValues = new Array<{ [key: string]: any }>();

    const valuesToCalculate = new Set<string>();
    specificFieldResponses.forEach(field => {
        concernedFieldValue.forEach(fieldValueName => {
            if (!Object.keys(field).some(k => k === fieldValueName)) return;
            valuesToCalculate.add(fieldValueName);
        });
    });

    const calculatorsForFieldValue = getCalculatorsForFieldValues();

    valuesToCalculate.forEach(valueToCalculate => {
        const calculator = calculatorsForFieldValue.get(valueToCalculate) ?? (() => { return undefined });
        const calculatedValue = calculator(specificFieldResponses);

        fieldValues.push({ [valueToCalculate]: calculatedValue });
    })

    return fieldValues;
}

export default {
    aggregateFieldValues
}