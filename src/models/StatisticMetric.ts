export default interface StatisticMetric {
    total: {[key: string]: number};
    average: {[key: string]: number};
    mean: {[key: string]: number};
    min: {[key: string]: number};
    max: {[key: string]: number};
}