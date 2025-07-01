// src/hooks/useAllBets.ts
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import { useCallback, useState } from 'react';
import { DTOToModel, ModelToDTO } from '../../shared/mapper/user.mapper';
import { UserModel } from '../../shared/model/user.model';

export default function useUpdateUser(user: UserModel) {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  useFocusEffect(
    useCallback(() => {
      let isMounted = true;
      setLoading(true);
      setError(null);

      axios
        .put(
          `http://${process.env.EXPO_PUBLIC_IP_ADDRESS_BE}:3000/user/${user.id}`,
          ModelToDTO(user),
        )
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
    }, []),
  );

  return { user, loading, error };
}
