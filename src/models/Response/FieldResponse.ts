import ContinuousMeanResponse from "./ContinuousMeanResponse";
import DiscreteVariableCountReponse from "./DiscreteVariableCountReponse";
import DiscreteVariableMarginalResponse from "./DiscreteVariableMarginalReponse";

export default interface FieldReponse {
    field: string;
    queries: string[];
    measure?: string;
    mean?: ContinuousMeanResponse;
    stdev?: number;
    ci95?: number[];
    count?: number | DiscreteVariableCountReponse[];
    mode?: string;
    marginal?: DiscreteVariableMarginalResponse;
}