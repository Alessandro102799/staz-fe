import axios from 'axios';
import { ModelToDTO } from '../../shared/mapper/bet.mapper';
import { BetModel } from '../../shared/model/bet.model';

export default async function useUpdateBet(bet: BetModel, id: number) {
    const response = await axios.put(`http://${process.env.EXPO_PUBLIC_IP_ADDRESS_BE}:3000/bets/${id}`, ModelToDTO(bet));
    return response.data;
}