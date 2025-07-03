import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import * as Progress from 'react-native-progress';
import useGetUser from '../api/user/useGetUser';
import colors from '../shared/constants/colors';
import { TabParamList } from './Menu';

export default function Budget() {
  const [width, setWidth] = useState(0);
  const { user, loading, error } = useGetUser();

  const navigation = useNavigation<NavigationProp<TabParamList>>();

  if (loading) return <ActivityIndicator size="large" />;
  if (error) return <Text>Errore nel caricamento</Text>;
  return (
    user &&
    user.currentBudget && (
      <View style={styles.container}>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Text style={{ fontFamily: 'Montserrat-SemiBold' }}>
            Current Budget
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Edit')}
            activeOpacity={0.5}
            style={{
              height: 30,
              width: 120,
              backgroundColor: colors.light_green,
              borderRadius: 50,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text
              style={{
                fontFamily: 'Montserrat-SemiBold',
                color: colors.green,
                fontSize: 12,
              }}
            >
              Edit Budget
            </Text>
          </TouchableOpacity>
        </View>
        <Text
          style={{
            fontFamily: 'Montserrat-SemiBold',
            fontSize: 36,
            color: user.currentBudget >= user.initialBudget ? colors.green : colors.red,
          }}
        >
          €
          {user?.currentBudget
            ? user?.currentBudget.toFixed(2).replace('.', ',')
            : 'N/D'}
          <Text
            style={{
              fontFamily: 'Montserrat-Regular',
              color: user.currentBudget >= user.initialBudget ? colors.green : colors.red,
              fontSize: 14,
            }}
          >
            {' '}
            {`(${(
              ((user.currentBudget - user.initialBudget) / user.initialBudget) *
              100
            )
              .toFixed(2)
              .replace('.', ',')}%)`}
          </Text>
        </Text>
        <View
          //prendo la larghezza del container
          style={{ paddingTop: 5, paddingBottom: 10 }}
          onLayout={event => {
            const layoutWidth = event.nativeEvent.layout.width;
            setWidth(layoutWidth);
          }}
        >
          {width > 0 && (
            <Progress.Bar
              color={colors.green}
              unfilledColor={colors.background}
              borderWidth={0}
              progress={Math.max(
                0,
                Math.min(
                  1,
                  (user.currentBudget - user.initialBudget) /
                    (user.finalBudget - user.initialBudget),
                ),
              )}
              width={width}
              height={15}
              borderRadius={50}
            />
          )}
        </View>
        <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
          <Text
            style={{
              fontFamily: 'Montserrat-Regular',
              fontSize: 12,
              color: colors.light_gray,
            }}
          >
            €{user.initialBudget.toFixed(2).replace('.', ',')} initial budget
          </Text>
          <Text
            style={{
              fontFamily: 'Montserrat-Regular',
              fontSize: 12,
              color: colors.light_gray,
            }}
          >
            €
            {(user.finalBudget - user?.currentBudget)
              .toFixed(2)
              .replace('.', ',')}{' '}
            to the final goal
          </Text>
        </View>
      </View>
    )
  );
}

const styles = StyleSheet.create({
  container: {
    height: 140,
    borderRadius: 10,
    padding: 10,
    backgroundColor: colors.white,
  },
});
