import { useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SwipeRow } from 'react-native-swipe-list-view';
import useAllBets from '../api/bet/useGetAll';
import useGetInProgress from '../api/bet/useGetInProgress';
import useGetLastMonth from '../api/bet/useGetLastMonth';
import useGetLastWeek from '../api/bet/useGetLastWeek';
import TennisIcon from '../assets/icons/tennis.svg';
import DeleteIcon from '../assets/icons/delete.svg';
import EditIcon from '../assets/icons/edit.svg';
import FootballIcon from '../assets/icons/football.svg';
import OtherIcon from '../assets/icons/other.svg';
import BasketIcon from '../assets/icons/basket.svg';
import colors from '../shared/constants/colors';
import { BetResult } from '../shared/enum/result.enum';
import { Sport } from '../shared/enum/sport.enum';
import { formatDate } from '../shared/utility/formatDate';
import { capitalizeFirstLetter } from '../shared/utility/letter';
import Budget from '../components/Budget';
import Info from '../components/Info';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { TabParamList } from '../components/Menu';

export default function HomeScreen() {
  const [selected, setSelected] = useState(0);
  const options = ['All', 'In progress', 'Last week', 'Last month'];

  const { bets: allBets, loading: loadingAll, error: errorAll } = useAllBets();
  const { bets: inProgressBets, loading: loadingProgress, error: errorProgress} = useGetInProgress();
  const { bets: lastWeekBets, loading: loadingWeek, error: errorWeek } = useGetLastWeek();
  const { bets: lastMonthBets, loading: loadingMonth, error: errorMonth } = useGetLastMonth();

  const navigation = useNavigation<NavigationProp<TabParamList>>();
  
  const getSelectedBets = () => {
    switch (selected) {
      case 0:
        return { data: allBets, loading: loadingAll, error: errorAll };
      case 1:
        return {
          data: inProgressBets,
          loading: loadingProgress,
          error: errorProgress,
        };
      case 2:
        return { data: lastWeekBets, loading: loadingWeek, error: errorWeek };
      case 3:
        return {
          data: lastMonthBets,
          loading: loadingMonth,
          error: errorMonth,
        };
      default:
        return { data: [], loading: false, error: null };
    }
  };

  const { data: bets, loading, error } = getSelectedBets();

  const handleSelect = (index: number) => {
    setSelected(index);
  };

  return (
    <View style={styles.container}>
      <Info />
      <Budget />
      <View>
        <View style={styles.container_data}>
          {options.map((label, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleSelect(index)}
              style={[
                styles.option,
                index === 0
                  ? styles.left
                  : index === options.length - 1
                  ? styles.right
                  : null,
                selected === index && styles.selected,
              ]}
            >
              <Text
                style={[styles.text, selected === index && styles.selectedText]}
              >
                {label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <Text
        style={{
          color: colors.light_gray,
          fontFamily: 'Montserrat-Regular',
          paddingTop: 10,
          paddingBottom: 10,
        }}
      >
        Total:{' '}
        <Text
          style={{ color: colors.black, fontFamily: 'Montserrat-SemiBold' }}
        >
          {bets.length} bets
        </Text>
      </Text>
      {bets.length > 0 ? <FlatList
        data={bets}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false} //
        renderItem={({ item: bet }) => (
          <SwipeRow rightOpenValue={-110} style={{ marginBottom: 10 }} onRowPress={() => navigation.navigate('EditBet', {id: bet.id ?? 0})}>
            {/* BACK (Edit + Delete) */}
            <View style={styles.container_swipe}>
              <TouchableOpacity
                style={styles.delete}
                onPress={() => console.log('Delete')}
              >
                <DeleteIcon />
              </TouchableOpacity>
            </View>

            {/* FRONT ROW */}
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text
                style={{
                  flex: 0.3,
                  textAlign: 'center',
                  fontFamily: 'Montserrat-Regular',
                  color: colors.light_gray,
                }}
              >
                {formatDate(new Date(bet.data))}
              </Text>
              <View
                style={{
                  flex: 0.7,
                  backgroundColor: colors.white,
                  height: 65,
                  borderRadius: 10,
                  flexDirection: 'row',
                }}
              >
                <View style={styles.icon}>
                  <View
                    style={{
                      width: 40,
                      height: 40,
                      borderWidth: 3,
                      borderColor: colors.light_gray,
                      borderRadius: 50,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    {bet.sport === Sport.FOOTBALL ? (
                      <FootballIcon />
                    ) : bet.sport === Sport.BASKET ? (
                      <BasketIcon />
                    ) : bet.sport === Sport.TENNIS ? (
                      <TennisIcon />
                    ) : (
                      <OtherIcon />
                    )}
                  </View>
                </View>
                <View style={styles.data}>
                  <Text
                    style={{ fontFamily: 'Montserrat-Regular', fontSize: 16 }}
                  >
                    {capitalizeFirstLetter(bet.type)}
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'Montserrat-Regular',
                      fontSize: 12,
                      color: colors.light_gray,
                    }}
                  >
                    Stake:{' '}
                    <Text style={{ fontFamily: 'Montserrat-SemiBold' }}>
                      {' '}
                      {bet.stake}%
                    </Text>
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'Montserrat-Regular',
                      fontSize: 12,
                      color: colors.light_gray,
                    }}
                  >
                    Amount:{' '}
                    <Text style={{ fontFamily: 'Montserrat-SemiBold' }}>
                      {' '}
                      €{bet.amount.toFixed(2).replace('.', ',')}
                    </Text>
                  </Text>
                </View>
                <View style={styles.result}>
                  <View
                    style={
                      bet.result === BetResult.WIN
                        ? styles.boxWin
                        : bet.result === BetResult.LOSS
                        ? styles.boxLoss
                        : styles.boxPending
                    }
                  >
                    <Text
                      style={
                        bet.result === BetResult.WIN
                          ? styles.textWin
                          : bet.result === BetResult.LOSS
                          ? styles.textLoss
                          : styles.textPending
                      }
                    >
                      €{bet.possibleWin.toFixed(2).replace('.', ',')}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </SwipeRow>
        )}
      /> : <Text style={{fontSize: 16, fontFamily: 'Montserrat-Regular', color: colors.light_gray, textAlign: 'center'}}>Matches not found!</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    backgroundColor: colors.background,
  },

  container_data: {
    flexDirection: 'row',
    backgroundColor: colors.super_light_gray,
    borderRadius: 20,
    width: '100%',
    marginTop: 10,
    overflow: 'hidden',
    alignSelf: 'center',
  },

  //option for select all, in progress, last week, last month
  option: {
    paddingVertical: 10,
    width: '25%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  left: {
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },

  right: {
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },

  selected: {
    backgroundColor: colors.light_black,
    borderRadius: 50,
  },

  text: {
    color: colors.light_gray,
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
  },

  selectedText: {
    color: 'white',
  },

  icon: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },

  data: {
    flex: 0.45,
    justifyContent: 'center',
  },

  result: {
    flex: 0.35,
    justifyContent: 'center',
    alignItems: 'center',
  },

  //swipe right
  container_swipe: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },

  delete: {
    height: '100%',
    width: 100,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.light_red,
  },

  backText: {
    color: 'white',
    fontWeight: 'bold',
  },

  //win
  boxWin: {
    width: '90%',
    height: 30,
    borderRadius: 50,
    backgroundColor: colors.light_green,
    justifyContent: 'center',
  },

  textWin: {
    textAlign: 'center',
    color: colors.green,
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 12,
  },

  //loss
  boxLoss: {
    width: '90%',
    height: 30,
    borderRadius: 50,
    backgroundColor: colors.light_red,
    justifyContent: 'center',
  },

  textLoss: {
    textAlign: 'center',
    color: colors.red,
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 12,
  },

  //pending
  boxPending: {
    width: '90%',
    height: 30,
    borderRadius: 50,
    backgroundColor: colors.light_blue,
    justifyContent: 'center',
  },

  textPending: {
    textAlign: 'center',
    color: colors.blue,
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 12,
  },
});
