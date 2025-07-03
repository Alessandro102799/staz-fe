import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import BetScreen from '../screens/BetScreen';
import ReportScreen from '../screens/ReportScreen';
import StatsScreen from '../screens/StatsScreen';
import CustomTabBar from './CustomTabBar';
import Edit from '../screens/Edit';

export type TabParamList = {
  Home: undefined;
  NewBet: undefined;
  Report: undefined;
  Stats: undefined;
  Edit: undefined;
  EditBet: {id: number};
};

const Tab = createBottomTabNavigator();

export default function Menu() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false, tabBarShowLabel: false }}
      tabBar={props => <CustomTabBar {...props} />}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="NewBet" component={BetScreen} />
      <Tab.Screen name="Report" component={ReportScreen} />
      <Tab.Screen name="Stats" component={StatsScreen} />
      <Tab.Screen name="Edit" component={Edit} />
      <Tab.Screen name="EditBet" component={BetScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});
