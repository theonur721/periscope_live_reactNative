import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  lastLiveLocation: null, // { latitude, longitude } | null
};

const liveSlice = createSlice({
  name: 'live',
  initialState,
  reducers: {
    setLastLiveLocation: (state, action) => {
      state.lastLiveLocation = action.payload;
    },
    clearLastLiveLocation: state => {
      state.lastLiveLocation = null;
    },
  },
});

export const { setLastLiveLocation, clearLastLiveLocation } = liveSlice.actions;
export default liveSlice.reducer;
