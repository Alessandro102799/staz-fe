import React, { useEffect } from 'react';
import { Dimensions, TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedProps
} from 'react-native-reanimated';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs'; // 👈 importa il tipo
import colors from '../shared/constants/colors';
import HomeIcon from '../assets/icons/home.svg';
import PlusIcon from '../assets/icons/plus.svg';
import ReportIcon from '../assets/icons/report.svg';
import StatsIcon from '../assets/icons/stats.svg';
import { MaterialIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const TAB_WIDTH = width / 4;
const AnimatedPath = Animated.createAnimatedComponent(Path);

const EditIcon = (props: any) => <MaterialIcons name="edit" {...props} />;

const tabs = [
  { name: 'Home', label: 'Home', icon: HomeIcon },
  { name: 'NewBet', label: 'NewBet', icon: PlusIcon },
  { name: 'Report', label: 'Report', icon: ReportIcon },
  { name: 'Stats', label: 'Stats', icon: StatsIcon },
  { name: 'Edit', label: 'Edit', icon: EditIcon },
];

const CustomTabBar: React.FC<BottomTabBarProps> = ({ state, navigation }) => {
  const animation = useSharedValue(0);

  useEffect(() => {
    animation.value = withTiming(state.index * TAB_WIDTH, { duration: 300 });
  }, [state.index]);

  const animatedProps = useAnimatedProps(() => {
    const x = animation.value;
    const left = x;
    const right = x + TAB_WIDTH;

    const d = `
      M0,0
      H${left}
      C${left + 10},0 ${left + 15},30 ${left + TAB_WIDTH / 2},30
      C${right - 15},30 ${right - 10},0 ${right},0
      H${width}
      V80
      H0
      Z
    `;

    return { d };
  });

  const ActiveIcon = tabs[state.index].icon;

  return (
    <View style={styles.container}>
      <Svg width={width} height={80} style={StyleSheet.absoluteFill}>
        <AnimatedPath animatedProps={animatedProps} fill='#171717' />
      </Svg>

      <Animated.View style={[styles.circle, { transform: [{ translateX: animation }] }]}>
        <View style={styles.innerCircle}>
          {ActiveIcon && <ActiveIcon width={24} height={24} fill="#fff" />}
        </View>
      </Animated.View>

      <View style={styles.tabItems}>
        {tabs.map((tab, index) => {
          const route = state.routes[index];
          const isFocused = state.index === index;
          const Icon = tab.icon;

          const onPress = () => navigation.navigate(route.name);

          return (
            <TouchableOpacity key={tab.name} onPress={onPress} style={styles.tab}>
              <View style={{ alignItems: 'center' }}>
                {!isFocused && <Icon width={24} height={24} fill="#aaa" />}
                <Text style={[styles.label, { color: isFocused ? '#fff' : '#aaa' }]}>
                  {tab.label}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default CustomTabBar;


const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    height: 80,
    width,
  },
  tabItems: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    width,
    height: 80,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tab: {
    width: TAB_WIDTH,
    alignItems: 'center',
  },
  label: {
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
  },
  circle: {
    position: 'absolute',
    top: -20,
    width: TAB_WIDTH,
    alignItems: 'center',
  },
  innerCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    top: -10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.light_black,
  },
});
