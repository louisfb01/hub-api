function calculate(ci95s: number[][]): number {
    let smallestAllowableSteps: number[]  = []
    const smallestAllowablePercent = 0.05;

    ci95s.forEach(siteCI =>{
        let step = (siteCI[1] - siteCI[0]) * smallestAllowablePercent;
        smallestAllowableSteps.push(step);
    })
    const result = Math.max(...smallestAllowableSteps);
    return result;
}

export default {
    calculate
}