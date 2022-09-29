import FieldResponse from "../../../models/Response/FieldResponse";
// @ts-ignore
import { pooledMean } from "shukra/src/pooling";

function calculate(specificFieldResponses: FieldResponse[]): number {
    let means: number[]  = []
    let count: number[] = []
    let totalCount: number = 0
    let sds: number[]  = []

    specificFieldResponses.forEach(siteField =>{
        if(!siteField.mean || !siteField.stdev) return
        means.push(siteField.mean?.mean)
        count.push(siteField.mean?.populationSize)
        totalCount += siteField.mean?.populationSize
        sds.push(siteField.stdev)
    })
    const pooledResult = pooledMean(count, means, sds)

    //ref: https://handbook-5-1.cochrane.org/chapter_7/7_7_3_2_obtaining_standard_deviations_from_standard_errors_and.htm
    const stdev = Math.sqrt(totalCount) * (pooledResult.upper - pooledResult.lower) / 3.92

    return stdev;
}

export default {
    calculate
}