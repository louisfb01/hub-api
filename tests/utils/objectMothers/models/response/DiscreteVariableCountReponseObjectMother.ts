import DiscreteVariableCountReponse from "../../../../../src/models/Response/DiscreteVariableCountReponse"

function get(label: string, value: number): DiscreteVariableCountReponse {
    return {
        label,
        value
    }
}

export default {
    get
}