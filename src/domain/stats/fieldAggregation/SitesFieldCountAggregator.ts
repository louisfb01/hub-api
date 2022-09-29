import DiscreteVariableCountReponse from "../../../models/Response/DiscreteVariableCountReponse";
import FieldResponse from "../../../models/Response/FieldResponse";

function getDiscreteCounts(specificFieldResponses: FieldResponse[]): DiscreteVariableCountReponse[] {
    const labelCounts = new Map<string, number>();

    specificFieldResponses.forEach(field => {
        const fieldDiscreteCounts = field.count as Array<DiscreteVariableCountReponse>;

        fieldDiscreteCounts.forEach(discreteCount => {
            if (!labelCounts.has(discreteCount.label)) {
                labelCounts.set(discreteCount.label, 0)
            }

            const previousCount = labelCounts.get(discreteCount.label) ?? 0;
            const currentCount = previousCount + discreteCount.value;
            labelCounts.set(discreteCount.label, currentCount);
        })
    })

    const discreteVariableCounts = new Array<DiscreteVariableCountReponse>();
    labelCounts.forEach((value: number, key: string) => {
        const discreteVariableCount = {
            label: key,
            value
        };

        discreteVariableCounts.push(discreteVariableCount);
    })

    return discreteVariableCounts;
}

function calculate(specificFieldResponses: FieldResponse[]): number | DiscreteVariableCountReponse[] {
    const possibleDiscreteCounts = specificFieldResponses[0].count as Array<DiscreteVariableCountReponse>;

    if (Array.isArray(possibleDiscreteCounts)) {
        return getDiscreteCounts(specificFieldResponses);
    }

    return specificFieldResponses.reduce((count: number, currentValue: FieldResponse) => {
        const possibleFieldCount = currentValue.count as number;
        const fieldCount = possibleFieldCount ?? 0;

        return count + fieldCount;
    }, 0);
}

export default {
    calculate
}