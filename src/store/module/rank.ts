import { getRankListRequest } from "@/api/request";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchRankListAction = createAsyncThunk("fetchRankListAction",(payload,{dispatch}) => {
    getRankListRequest().then((data:any) => {
        // console.log(data.list);
        dispatch(changeRankList(data.list))
    })
})


const rankSlice = createSlice({
  name: "rank",
  initialState: {
    rankList: [],
    loading: true,
  },
  reducers: {
    changeRankList(state, { payload }) {
      state.rankList = payload;
      state.loading = false;
    },
  },
});

export const { changeRankList } = rankSlice.actions;

export default rankSlice.reducer;
