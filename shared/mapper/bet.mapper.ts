import { BetDTO } from "../dto/bet.dto";
import { BetModel } from "../model/bet.model";

export function DTOToModel(bet: BetDTO): BetModel {
    return {
      id: bet.id,
      type: bet.type,
      stake: bet.stake,
      amount: bet.amount,
      possibleWin: bet.possibleWin,
      sport: bet.sport,
      quote: bet.quote,
      result: bet.result,
      description: bet.description,
      data: bet.data,
    };
  }  

export function ModelToDTO(bet: BetModel): BetDTO {
  return {
    id: bet.id,
    type: bet.type,
    stake: bet.stake,
    amount: bet.amount,
    possibleWin: bet.possibleWin,
    sport: bet.sport,
    quote: bet.quote,
    result: bet.result,
    description: bet.description,
    data: bet.data,
  };
}
