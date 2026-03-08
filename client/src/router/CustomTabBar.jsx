import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ROUTES } from './Routes';
import { COLORS } from '../theme/Colors';
import { normalize, moderateScale } from '../utils/Normalize';

const CustomTabBar = ({ state, navigation }) => {
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const focused = state.index === index;

        let iconName = 'circle';
        if (route.name === ROUTES.Broadcasts) iconName = 'video-camera';
        if (route.name === ROUTES.Map) iconName = 'globe';
        if (route.name === ROUTES.Profile) iconName = 'user-circle-o';

        const color = focused ? COLORS.white : COLORS.secondary;

        return (
          <TouchableOpacity
            key={route.key}
            style={styles.tab}
            onPress={() => navigation.navigate(route.name)}
            activeOpacity={0.85}
            hitSlop={{
              top: moderateScale(8),
              bottom: moderateScale(8),
              left: moderateScale(8),
              right: moderateScale(8),
            }}
          >
            <Icon name={iconName} size={normalize(24)} color={color} />
            {focused && <View style={styles.indicator} />}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default CustomTabBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
    height: moderateScale(60),
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicator: {
    position: 'absolute',
    bottom: 0,
    height: moderateScale(3),
    width: '40%',
    backgroundColor: COLORS.white,
    borderRadius: moderateScale(2),
  },
});
