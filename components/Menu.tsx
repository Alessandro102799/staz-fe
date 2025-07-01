import * as React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./Screen/HomeScreen";
import NewBetScreen from "./Screen/NewBetScreen";
import ReportScreen from './Screen/ReportScreen';
import StatsScreen from './Screen/StatsScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import colors from '../shared/constants/colors';
import CustomTabBar from './CustomTabBar';
import InfoScreen from './Screen/InfoScreen';

const Tab = createBottomTabNavigator();


export default function Menu() {
    return (
        <Tab.Navigator screenOptions={{headerShown: false, tabBarShowLabel: false}} tabBar={props => <CustomTabBar {...props} />}>
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="NewBet" component={NewBetScreen} />
            <Tab.Screen name="Report" component={ReportScreen} />
            <Tab.Screen name="Stats" component={StatsScreen} />
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    
})