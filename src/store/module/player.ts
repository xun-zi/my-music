import { CurrentSong } from "@/components/Player/type";
import { createSlice } from "@reduxjs/toolkit";



const playerSlice = createSlice({
  name: "player",
  initialState: {
    playing: false,
    fullScreen: false,
    songIndex:0,
    currentTime:0,
    playList:[] as CurrentSong[],
    currentSong:{},
    playerState:0
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
    },
    changeCurrentTime(state,{payload}:{payload:number}){
      state.currentTime = payload
    },
    changeCurrentSong(state,{payload}:any){
      state.currentSong = payload
    },
    switchToPlayList(state,{payload}:{payload:CurrentSong[]}){
      state.playList = payload;
      state.songIndex = 0;
      state.currentTime = 0;
      state.currentSong = payload[0]
    },
    nextSong(state){
      state.songIndex = (state.songIndex + 1)%state.playList.length;
      state.currentSong = state.playList[state.songIndex];
    },
    preSong(state){
      state.songIndex = (state.songIndex - 1 + state.playList.length)%state.playList.length;
      state.currentSong = state.playList[state.songIndex];
    },
    changePlayerState(state,{payload}:{payload:number}){
      state.playerState = payload;
    },
    randomPlayer(state,{payload}:{payload:number}){
      state.songIndex = payload;
      state.currentSong = state.playList[state.songIndex];
    }
  },
});

export const { changePlayer,changeScreen,changeCurrentTime,switchToPlayList,nextSong,preSong,changePlayerState,changeSongIndex,randomPlayer} = playerSlice.actions;

export default playerSlice.reducer;
