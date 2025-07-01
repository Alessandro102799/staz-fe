export interface UserModel {
    id: number;
    name: string;
    surname: string;
    initialBudget: number;
    currentBudget?: number;
    finalBudget: number;
}
  