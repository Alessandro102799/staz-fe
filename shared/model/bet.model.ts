export interface BetModel {
    id: number;
    type: string;
    stake: number;
    amount: number;
    possibleWin: number;
    sport: string;
    quote: number;
    result: string;
    description: string;
    data: Date; // o Date se lo converti
}
  