export interface BedData {
    name: string;
    occupied: string;
    overall: string;
    critical: string;
    respiratory: string;
}

export interface TestData {
    name: string;
    positive: string;
    negative: string;
    awaiting: string;
}

export interface MortalityData {
    name: string;
    confirmed: string;
    suspected: string;
    rate: string;
}

export interface EquipmentData {
    name: string;
    inuse?: string;
    instock?: string;
    total: string;
}
