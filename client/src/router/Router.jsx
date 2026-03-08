import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useDispatch, useSelector } from 'react-redux';
import { ROUTES } from './Routes';

import TabRouter from './TabRouter';
import OnBoarding from '../screens/auth/OnBoarding';
import Register from '../screens/auth/Register';
import Login from '../screens/auth/Login';

import { hydrateAuthThunk } from '../store/thunks/AuthThunks';
import HostLiveRoom from '../screens/live/HostLiveRoom';

const Stack = createNativeStackNavigator();

const Router = () => {
  const dispatch = useDispatch();
  const { token, hydrated } = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(hydrateAuthThunk());
  }, [dispatch]);

  if (!hydrated) return null;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {token ? (
        <>
          <Stack.Screen name={ROUTES.TabRouter} component={TabRouter} />
          <Stack.Screen name={ROUTES.HostLiveRoom} component={HostLiveRoom} />
        </>
      ) : (
        <>
          <Stack.Screen name={ROUTES.OnBoarding} component={OnBoarding} />
          <Stack.Screen name={ROUTES.Login} component={Login} />
          <Stack.Screen name={ROUTES.Register} component={Register} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default Router;
