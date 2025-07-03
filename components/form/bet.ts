import { BetResult } from "../../shared/enum/result.enum";
import { Sport } from "../../shared/enum/sport.enum";
import { Type } from "../../shared/enum/type.enum";

export interface IBet {
    data: Date,
    type: string;
    stake: number;
    amount: number;
    possibleWin: number;
    sport: string;
    quote: number;
    result: string;
  }
  
  export const betFormDefaultValue: IBet = {
    data: new Date(),
    type: Type.DOUBLE,
    stake: 0,
    amount: 0,
    possibleWin: 0,
    sport: Sport.FOOTBALL,
    quote: 0,
    result: BetResult.PENDING
  };
  