import { createSlice } from "@reduxjs/toolkit";
const playerSlice = createSlice({
  name: "player",
  initialState: {
    playing: false,
    fullScreen: false,
    songIndex:0,
  },
  reducers: {
    changePlayer(state, { payload }: { payload: boolean }) {
      state.playing = payload;
    },
    changeScreen(state, { payload }: { payload: boolean }) {
      state.fullScreen = payload;
    },
    changeSongIndex(state,{payload}:{payload:number}){
        state.songIndex = payload
    }
  },
});

export const { changePlayer,changeScreen } = playerSlice.actions;

export default playerSlice.reducer;
