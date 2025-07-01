import { BetDTO } from "../dto/bet.dto";
import { UserDTO } from "../dto/user.dto";
import { BetModel } from "../model/bet.model";
import { UserModel } from "../model/user.model";

export function DTOToModel(user: UserDTO): UserModel {
  return {
    id: user.id,
    name: user.name,
    surname: user.surname,
    initialBudget: user.initialBudget,
    currentBudget: user.currentBudget,
    finalBudget: user.finalBudget,
  };
}  

export function ModelToDTO(user: UserModel): UserDTO {
  return {
    id: user.id,
    name: user.name,
    surname: user.surname,
    initialBudget: user.initialBudget,
    finalBudget: user.finalBudget,
  };
}
