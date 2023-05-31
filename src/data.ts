import dayjs from 'dayjs'

export type RawTeam = {
    total_points: number,
    name: string,
    carlogo: string,
    carmodel: string,
    D1: RawDriver | undefined,
    D2: RawDriver | undefined,
}


export type RawDriver = {
    position: number,
    name: string
    steamID: string,
    flag: string,
    carnummer: number,
    seasonclass: string,
    carlogo: string,
    carmodel: string,
    TeamName: string,
    FastestLap: number,
    VirtualPoints: number
}


export class Team {
    readonly points: number;
    readonly name: string;
    readonly carModel: string;
    readonly drivers: Array<Driver>;
    showDrivers: boolean

    constructor(raw: RawTeam) {
        this.points = raw.total_points;
        this.name = raw.name;
        this.carModel = raw.carmodel;
        this.showDrivers = false;
        let drivers: Array<Driver> = [];

        if (raw.D1 !== undefined && raw.D1 && !(raw.D1 instanceof String)) {
            const d1 = new Driver(raw.D1, 1);
            drivers.push(d1);
        }

        if (raw.D2 !== undefined && raw.D2 && !(raw.D2 instanceof String)) {
            const d2 = new Driver(raw.D2, 2);
            if (raw.D1 !== undefined && d2.position < raw.D1.position) {
                drivers.unshift(d2);
            } else {
                drivers.push(d2);
            }
        }
        this.drivers = drivers
    }

}


export class Driver {
    readonly name: string;
    readonly position: number;
    readonly carNumber: number;
    readonly carModel: string;
    readonly teamName: string;
    readonly fastestLap: number;
    readonly points: number;
    readonly driverNumber: number;

    constructor(raw: RawDriver, number: number) {
        this.name = raw.name;
        this.position = raw.position;
        this.carNumber = raw.carnummer;
        this.carModel = raw.carmodel;
        this.teamName = raw.TeamName;
        this.fastestLap = raw.FastestLap;
        this.points = raw.VirtualPoints;
        this.driverNumber = number;
    }

    fastestLapString(): string {
        const date = new Date(this.fastestLap)
        const d = dayjs(date)
        return d.format("mm:ss.sss");

    }
}


const DATA_SOURCE = "../backend/test_data.json"


export async function getPositions(): Promise<Array<Team>> {
    const response = await fetch(DATA_SOURCE);
    const jsonData: Array<RawTeam> = await response.json();
    let teams = [];
    for (let i = 0; i < jsonData.length; i++) {
        let team = new Team(jsonData[i]);
        teams.push(team);
    }
    return teams;
}
