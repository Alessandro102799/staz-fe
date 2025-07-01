// src/hooks/useAllBets.ts
import { useState, useCallback } from 'react';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';
import { DTOToModel } from '../../shared/mapper/bet.mapper';
import { BetModel } from '../../shared/model/bet.model';

export default function useGetLastMonth() {
  const [bets, setBets] = useState<BetModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  useFocusEffect(
    useCallback(() => {
      let isMounted = true;
      setLoading(true);
      setError(null);

      axios
        .get(
          `http://${process.env.EXPO_PUBLIC_IP_ADDRESS_BE}:3000/bets/last-month`,
        )
        .then(response => {
          if (isMounted) {
            const mapped = response.data.map(DTOToModel);
            setBets(mapped);
          }
        })
        .catch(err => {
          if (isMounted) {
            setError(err);
          }
        })
        .finally(() => {
          if (isMounted) {
            setLoading(false);
          }
        });

      return () => {
        isMounted = false;
      };
    }, [])
  );

  return { bets, loading, error };
}
