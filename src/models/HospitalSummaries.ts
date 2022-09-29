import StatisticMetric from "./StatisticMetric";

export default interface HospitalSummaries {
    covid_cases: { [key: string]: number },
    death:{ [key: string]: number },
    ventilator: { [key: string]: number },
    icu: { [key: string]: number },

    // positiveTestsMetrics: StatisticMetric;
    // patientsMetrics: StatisticMetric;
    // patientsInIntensiveCareMetrics: StatisticMetric;
    // remainingBedsMetrics: StatisticMetric;

    failedRequestsCount: number;
    hospitalsProvidingInfo: string[];
}
