import DiscreteVariableCountReponse from "../../../../../src/models/Response/DiscreteVariableCountReponse";
import FieldResponse from "../../../../../src/models/Response/FieldResponse";

function get(field: string = 'field', count: number = 72): FieldResponse {
    return {
        field,
        queries: [],
        count
    }
}

function getWithFieldValue(field: string, values: any): FieldResponse {
    const fieldInstance = { field };

    return { ...fieldInstance, ...values };
}

function getWithCount(count?: number | DiscreteVariableCountReponse[]): FieldResponse {
    return {
        field: 'field',
        queries: [],
        count
    }
}

function getWithMean(mean: number, total: number): FieldResponse {
    return {
        field: 'field',
        queries: [],
        mean: {
            mean,
            populationSize: total
        }
    }
}

export default {
    get,
    getWithFieldValue,
    getWithCount,
    getWithMean
}