import { createSlice } from "@reduxjs/toolkit";

const playerSlice = createSlice({
  name: "player",
  initialState: {
    playing: true,
    fullScreen: false,
  },
  reducers: {
    changePlayer(state, { payload }: { payload: boolean }) {
      state.playing = payload;
    },
    changeScreen(state, { payload }: { payload: boolean }) {
      state.fullScreen = payload;
    },
  },
});

export const { changePlayer,changeScreen } = playerSlice.actions;

export default playerSlice.reducer;
