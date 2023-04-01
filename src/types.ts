export interface Bet {
    manOfMatch: string;
    matchId: number;
    team: string;
    timestamp: Date
}

export interface Match {
    date: string;
    home: string;
    away: string;
    venue: string;
    time: string;
    awayCode: string;
    homeCode: string;
}

export interface User {
    email: string;
    timestamp: Date;
    userId: string;
    userName: string;
    points?: number;
}