import FieldResponse from "../../../models/Response/FieldResponse";
// @ts-ignore
import { pooledMean } from "shukra/src/pooling";

function calculate(specificFieldResponses: FieldResponse[]): number[] {
    let means: number[]  = []
    let count: number[] = []
    let sds: number[]  = []

    specificFieldResponses.forEach(siteField =>{
        if(!siteField.mean || !siteField.stdev) return
        means.push(siteField.mean?.mean)
        count.push(siteField.mean?.populationSize)
        sds.push(siteField.stdev)
    })
    const result = pooledMean(count, means, sds)
    return [result.lower, result.upper];

}

export default {
    calculate
}