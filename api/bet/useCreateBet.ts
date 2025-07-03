import axios from 'axios';
import { ModelToDTO } from '../../shared/mapper/bet.mapper';
import { BetModel } from '../../shared/model/bet.model';

export default async function useCreateBet(bet: BetModel) {
    const response = await axios.post(`http://${process.env.EXPO_PUBLIC_IP_ADDRESS_BE}:3000/bets`, ModelToDTO(bet));
    return response.data;
}