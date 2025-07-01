// src/hooks/useAllBets.ts
import { useState, useCallback } from 'react';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';
import { UserModel } from '../../shared/model/user.model';
import { DTOToModel } from '../../shared/mapper/user.mapper';

export default function useGetUser() {
  const [user, setUser] = useState<UserModel>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  useFocusEffect(
    useCallback(() => {
      let isMounted = true;
      setLoading(true);
      setError(null);

      axios.get('http://192.168.0.109:3000/user')
        .then(response => {
          if (isMounted) {
            const mapped = response.data.map(DTOToModel);
            setUser(mapped[0]);
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

  return { user, loading, error };
}
