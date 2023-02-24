import { lyricParser } from "@/api/utils";
import { CurrentSong } from "@/components/Player/type";
import { createSlice } from "@reduxjs/toolkit";

const playerSlice = createSlice({
  name: "player",
  initialState: {
    playing: false,
    fullScreen: false,
    songIndex: 0,
    playList: [] as CurrentSong[],
    currentSong: {},
    playerState: 0,
    showPlayList: false,
    lyrics: [] as any,
  },
  reducers: {
    changePlayer(state, { payload }: { payload: boolean }) {
      state.playing = payload;
    },
    changeScreen(state, { payload }: { payload: boolean }) {
      state.fullScreen = payload;
    },
    changeSongIndex(state, { payload }: { payload: number }) {
      state.songIndex = payload;
    },
    changeCurrentSong(state, { payload }: any) {
      state.currentSong = payload;
    },
    changeShowPlayList(state, { payload }: { payload: boolean }) {
      state.showPlayList = payload;
    },
    changePlayList(state, { payload }: { payload: CurrentSong[] }) {
      state.playList = payload;
    },
    changelyrics(state, { payload }: { payload: string }) {
      console.log(payload);
      state.lyrics = lyricParser(payload);
    },
    nextSong(state) {
      state.songIndex = (state.songIndex + 1) % state.playList.length;
      state.currentSong = state.playList[state.songIndex];
    },
    preSong(state) {
      state.songIndex =
        (state.songIndex - 1 + state.playList.length) % state.playList.length;
      state.currentSong = state.playList[state.songIndex];
    },
    changePlayerState(state, { payload }: { payload: number }) {
      state.playerState = payload;
    },
    randomPlayer(state, { payload }: { payload: number }) {
      state.songIndex = payload;
      state.currentSong = state.playList[state.songIndex];
    },
    selectPlayerSong(state, { payload }: { payload: number }) {
      state.songIndex = payload;
      state.currentSong = state.playList[state.songIndex];
    },
  },
});

export const {
  changePlayer,
  changeScreen,
  nextSong,
  preSong,
  changePlayerState,
  changeSongIndex,
  randomPlayer,
  changeShowPlayList,
  selectPlayerSong,
  changePlayList,
  changelyrics,
} = playerSlice.actions;

export default playerSlice.reducer;
