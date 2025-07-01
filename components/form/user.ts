export interface IUser {
  name: string;
  surname: string;
  initialBudget: number;
  currentBudget?: number;
  finalBudget: number;
}

export const userFormDefaultValue: IUser = {
  name: '',
  surname: '',
  initialBudget: 0,
  finalBudget: 0,
};
