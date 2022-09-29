import HospitalInfo from "../models/HospitalInfo";
import HospitalSummaries from "../models/HospitalSummaries";
import StatisticMetric from "../models/StatisticMetric";
import WebSocketBusEventResult from "../websocket/WebSocketBusEventResult";

const ALL_NAME = 'all',
    TOTAL_NAME = 'total';

function getTotalStatisticMetric(hospitalInfos: HospitalInfo[], 
    valueGetterCallback: (hi: HospitalInfo) => number) {

    const allStatisticMetric: {[key: string]: number} = {};

    allStatisticMetric[ALL_NAME] = 0;

    hospitalInfos.forEach((hi) => {
        allStatisticMetric[hi.hospitalNumber] =  valueGetterCallback(hi);
    })

    return allStatisticMetric;
}

function getAllStatisticMetric(hospitalsProvidingInfo: string[], value: number) {
    const allStatisticMetric: {[key: string]: number} = {};

    allStatisticMetric[ALL_NAME] = value;

    hospitalsProvidingInfo.forEach((hpi) => {
        allStatisticMetric[hpi] = 0;
    })

    return allStatisticMetric;
}

function getStatisticMetricForField(hospitalInfos: HospitalInfo[], 
    hospitalsProvidingInfo: string[],
    hospitalCount: number, 
    valueGetterCallback: (hi: HospitalInfo) => number): StatisticMetric {

    const total = getTotalStatisticMetric(hospitalInfos, valueGetterCallback);

    const totalValue = hospitalInfos.map(valueGetterCallback).reduce((a, b) => a + b, 0);
    const averageValue = Math.floor(totalValue / hospitalCount);
    const average = getAllStatisticMetric(hospitalsProvidingInfo, averageValue);

    const minValue = hospitalInfos.map(valueGetterCallback).sort((a, b) => a - b)[0];
    const min = getAllStatisticMetric(hospitalsProvidingInfo, minValue);
    
    const meanValue = hospitalInfos.map(valueGetterCallback).sort((a, b) => a - b)[Math.floor(hospitalCount / 2)];
    const mean = getAllStatisticMetric(hospitalsProvidingInfo, meanValue);

    const maxValue = hospitalInfos.map(valueGetterCallback).sort((a, b) => b - a)[0];
    const max = getAllStatisticMetric(hospitalsProvidingInfo, maxValue);

    return {
        total,
        average,
        min,
        mean,
        max
    }
}

function getValues(hospitalInfos: HospitalInfo[],
                                 valueGetterCallback: (hi: HospitalInfo) => number) {

    const allStatisticMetric: {[key: string]: number} = {};

    allStatisticMetric[TOTAL_NAME] = 0;

    hospitalInfos.forEach((hi) => {
        allStatisticMetric[hi.hospitalNumber] =  valueGetterCallback(hi);
        allStatisticMetric[TOTAL_NAME] += valueGetterCallback(hi);
    })

    return allStatisticMetric;
}

function getValueForField(hospitalInfos: HospitalInfo[],
                                    hospitalsProvidingInfo: string[],
                                    hospitalCount: number,
                                    valueGetterCallback: (hi: HospitalInfo) => number): { [key: string]: number } {

    const values = getValues(hospitalInfos, valueGetterCallback);

    return values;
}

function calculateSummariesFromInfo(webSocketResults: WebSocketBusEventResult<HospitalInfo>[]): HospitalSummaries {
    const failedRequestsCount = webSocketResults.filter(wsr => !wsr.succeeded).length;
    const successRequestsCount = webSocketResults.length - failedRequestsCount;

    const results = webSocketResults.filter(wsr => wsr.succeeded).map(wsr => wsr.result);
    const hospitalsProvidingInfo = results.map(r => r.hospitalNumber);

    // const positiveTestsMetrics = getStatisticMetricForField(results, hospitalsProvidingInfo, successRequestsCount, (hi) => hi.positiveTests);
    // const patientsMetrics = getStatisticMetricForField(results, hospitalsProvidingInfo, successRequestsCount, (hi) => hi.totalPatients);
    // const patientsInIntensiveCareMetrics = getStatisticMetricForField(results, hospitalsProvidingInfo, successRequestsCount, (hi) => hi.totalPatientsInIntensiveCare);
    // const remainingBedsMetrics = getStatisticMetricForField(results, hospitalsProvidingInfo, successRequestsCount, (hi) => hi.remainingBeds);

    const covid_cases = getValueForField(results, hospitalsProvidingInfo, successRequestsCount, (hi) => hi.covid_cases);
    const death = getValueForField(results, hospitalsProvidingInfo, successRequestsCount, (hi) => hi.death);
    const ventilator = getValueForField(results, hospitalsProvidingInfo, successRequestsCount, (hi) => hi.ventilator);
    const icu = getValueForField(results, hospitalsProvidingInfo, successRequestsCount, (hi) => hi.icu);

    return {
        covid_cases,
        death,
        ventilator,
        icu,

        // positiveTestsMetrics,
        // patientsMetrics,
        // patientsInIntensiveCareMetrics,
        // remainingBedsMetrics,

        failedRequestsCount,
        hospitalsProvidingInfo: hospitalsProvidingInfo.concat(['total']),
    }
}

export default {
    calculateSummariesFromInfo
}
