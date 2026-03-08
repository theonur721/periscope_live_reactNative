import { createAsyncThunk } from '@reduxjs/toolkit';
import { authService } from '../../services/AuthService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = 'token';
const USER_KEY = 'user';

const logAxiosError = (tag, err) => {
  console.log(`❌ [${tag}] message:`, err?.message);
  console.log(`❌ [${tag}] code:`, err?.code);
  console.log(`❌ [${tag}] status:`, err?.response?.status);
  console.log(`❌ [${tag}] data:`, err?.response?.data);
  console.log(`❌ [${tag}] req url:`, err?.config?.baseURL, err?.config?.url);
  console.log(`❌ [${tag}] req method:`, err?.config?.method);
  console.log(`❌ [${tag}] req headers:`, err?.config?.headers);
};

/* ✅ HYDRATE (APP AÇILIŞI) */
export const hydrateAuthThunk = createAsyncThunk('auth/hydrate', async () => {
  const token = await AsyncStorage.getItem(TOKEN_KEY);
  if (!token) return { token: null, user: null };

  try {
    console.log('🟨 [HYDRATE] token exists, calling /me ...');

    const res = await authService.me(token);

    console.log('✅ [HYDRATE] status:', res?.status);
    console.log('✅ [HYDRATE] data:', res?.data);

    const user = res?.data?.user ?? null;

    if (user) await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
    else await AsyncStorage.removeItem(USER_KEY);

    return { token, user };
  } catch (e) {
    logAxiosError('HYDRATE', e);

    await AsyncStorage.removeItem(TOKEN_KEY);
    await AsyncStorage.removeItem(USER_KEY);
    return { token: null, user: null };
  }
});

/* ✅ LOGIN */
export const loginThunk = createAsyncThunk(
  'auth/login',
  async (payload, { rejectWithValue }) => {
    try {
      console.log('🟦 [LOGIN] payload:', payload);

      const res = await authService.login(payload);

      console.log('✅ [LOGIN] status:', res?.status);
      console.log('✅ [LOGIN] data:', res?.data);

      const token = res?.data?.token ?? res?.data?.scopetoken ?? null;
      const user = res?.data?.user ?? null;

      if (token) await AsyncStorage.setItem(TOKEN_KEY, token);
      if (user) await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));

      return { ...res.data, token, user };
    } catch (err) {
      logAxiosError('LOGIN', err);

      // ✅ server message varsa onu döndür
      return rejectWithValue(
        err?.response?.data?.message ||
          err?.response?.data?.error ||
          err?.message ||
          'Login failed',
      );
    }
  },
);

/* ✅ REGISTER */
export const registerThunk = createAsyncThunk(
  'auth/register',
  async (payload, { rejectWithValue }) => {
    try {
      console.log('🟩 [REGISTER] payload:', payload);

      const res = await authService.register(payload);

      console.log('✅ [REGISTER] status:', res?.status);
      console.log('✅ [REGISTER] data:', res?.data);

      return res.data;
    } catch (err) {
      logAxiosError('REGISTER', err);

      return rejectWithValue(
        err?.response?.data?.message ||
          err?.response?.data?.error ||
          err?.message ||
          'Register failed',
      );
    }
  },
);

/* ✅ LOGOUT */
export const logoutThunk = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      console.log('🟧 [LOGOUT] calling logout...');

      const res = await authService.logout();

      console.log('✅ [LOGOUT] status:', res?.status);
      console.log('✅ [LOGOUT] data:', res?.data);

      await AsyncStorage.removeItem(TOKEN_KEY);
      await AsyncStorage.removeItem(USER_KEY);

      return true;
    } catch (err) {
      logAxiosError('LOGOUT', err);

      // server patlasa bile local temizle
      await AsyncStorage.removeItem(TOKEN_KEY);
      await AsyncStorage.removeItem(USER_KEY);

      return rejectWithValue(
        err?.response?.data?.message ||
          err?.response?.data?.error ||
          err?.message ||
          'Logout failed',
      );
    }
  },
);

/* ✅ DELETE ACCOUNT */
export const deleteAccountThunk = createAsyncThunk(
  'auth/deleteAccount',
  async (_, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;
      console.log('🟥 [DELETE] token exists?', !!token);

      const res = await authService.deleteAccount(token);

      console.log('✅ [DELETE] status:', res?.status);
      console.log('✅ [DELETE] data:', res?.data);

      await AsyncStorage.removeItem(TOKEN_KEY);
      await AsyncStorage.removeItem(USER_KEY);

      return res.data;
    } catch (err) {
      logAxiosError('DELETE', err);

      return rejectWithValue(
        err?.response?.data?.message ||
          err?.response?.data?.error ||
          err?.message ||
          'Delete account failed',
      );
    }
  },
);
