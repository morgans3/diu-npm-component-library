export class PopulationPerson {
    fullname?: string;
    nhsnumber?: string;
    ccg: string;
    age: number;
    sex: string;
    rsk: number;
    w: string;
    t: string;
    m: string;
    d: number;
    l: string;
    gp: string;
    fr: string;
    a: number;
    ld: number;
    lcnt: string;
    ltcs: string[];

    public constructor(init?: Partial<PopulationPerson>) {
        Object.assign(this, init);
    }
}
