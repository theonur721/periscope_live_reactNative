import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { ROUTES } from './Routes';

import Broadcasts from '../screens/Broadcasts';
import Map from '../screens/Map';
import Profile from '../screens/Profile';
import CustomTabBar from './CustomTabBar';

const Tab = createMaterialTopTabNavigator();

const TabRouter = () => {
  return (
    <Tab.Navigator
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={{
        tabBarStyle: { height: 64 },
      }}
    >
      <Tab.Screen name={ROUTES.Broadcasts} component={Broadcasts} />
      <Tab.Screen name={ROUTES.Map} component={Map} />
      <Tab.Screen name={ROUTES.Profile} component={Profile} />
    </Tab.Navigator>
  );
};

export default TabRouter;
