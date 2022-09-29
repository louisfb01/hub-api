export default interface HospitalInfo {
    hospitalNumber: string;

    positiveTests: number;

    totalPatients: number;
    totalPatientsInIntensiveCare: number;
    remainingBeds: number;

    covid_cases: number;
    death: number;
    ventilator: number;
    icu: number;
}
