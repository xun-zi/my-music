import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    hotList: [],
    suggestList: {},
    songsList: [],
  },
  reducers: {
    changeHotList(state, { payload }) {
      state.hotList = payload;
    },
    changeSuggestList(state, { payload }) {
      state.suggestList = payload;
    },
    changeSongList(state, { payload }) {
      state.songsList = payload;
    },
  },
});

export const { changeHotList, changeSongList, changeSuggestList } =
  searchSlice.actions;

export default searchSlice.reducer;
