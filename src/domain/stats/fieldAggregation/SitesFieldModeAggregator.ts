import DiscreteVariableCountReponse from "../../../models/Response/DiscreteVariableCountReponse";
import FieldResponse from "../../../models/Response/FieldResponse";

function calculate(specificFieldResponses: FieldResponse[]): string {
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

    let mode = '';
    let modeCount = 0;

    labelCounts.forEach((value: number, key: string) => {
        if (value < modeCount) return;

        mode = key;
        modeCount = value;
    })

    return mode;
}

export default {
    calculate
}