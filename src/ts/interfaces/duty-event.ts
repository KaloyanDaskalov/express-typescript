interface Duties {
    date: string;
    dutyOne: string;
    dutyTwo: string;
}

interface DutyEvents {
    name: string;
    position: string;
    duties: Duties[];
}

export interface DutyEventList {
    [key:string]: DutyEvents
}