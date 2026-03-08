import { createSlice } from '@reduxjs/toolkit';
import {
  deleteAccountThunk,
  loginThunk,
  logoutThunk,
  registerThunk,
  hydrateAuthThunk,
} from '../thunks/AuthThunks';

const initialState = {
  user: null,
  token: null,
  status: 'idle',
  error: null,
  hydrated: false,
};

const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: state => {
      state.user = null;
      state.token = null;
      state.status = 'idle';
      state.error = null;
    },
    clearAuthError: state => {
      state.error = null;
    },
  },
  extraReducers: builder => {
    // ✅ HYDRATE (APP OPEN)
    builder
      .addCase(hydrateAuthThunk.pending, state => {})
      .addCase(hydrateAuthThunk.fulfilled, (state, action) => {
        state.token = action.payload?.token ?? null;
        state.user = action.payload?.user ?? null;
        state.hydrated = true;
      })
      .addCase(hydrateAuthThunk.rejected, state => {
        state.hydrated = true;
      });

    // ✅ LOGIN
    builder
      .addCase(loginThunk.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload?.user ?? null;
        state.token = action.payload?.token ?? null;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Login failed';
      });

    // ✅ REGISTER
    builder
      .addCase(registerThunk.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';

        state.user = action.payload?.user ?? null;
        state.token = action.payload?.token ?? null;
      })
      .addCase(registerThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Register failed';
      });

    // ✅ LOGOUT
    builder.addCase(logoutThunk.fulfilled, state => {
      state.user = null;
      state.token = null;
      state.status = 'idle';
      state.error = null;
    });

    // ✅ DELETE ACCOUNT
    builder
      .addCase(deleteAccountThunk.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(deleteAccountThunk.fulfilled, state => {
        state.status = 'succeeded';
        state.user = null;
        state.token = null;
      })
      .addCase(deleteAccountThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Delete account failed';
      });
  },
});

export const { logout, clearAuthError } = AuthSlice.actions;
export default AuthSlice.reducer;
