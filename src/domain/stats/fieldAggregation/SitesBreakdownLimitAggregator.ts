function calculate(ci95s: number[][][]): number {
    let smallestAllowableSteps: number[]  = []
    const smallestAllowablePercent = 0.05;

    ci95s.forEach(siteCI =>{
        let ciLow = siteCI[0][0];
        let ciHigh = siteCI[0][1];
        let step = (ciHigh - ciLow) * smallestAllowablePercent;
        smallestAllowableSteps.push(step);
    })
    const result = Math.max(...smallestAllowableSteps);
    return result;
}

export default {
    calculate
}