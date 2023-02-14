import { getSingerInfoRequest } from "@/api/request";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const fetchSingerDataAction = createAsyncThunk("fetchSingerDataAction",(payload:number|string,{dispatch}) => {
    getSingerInfoRequest(payload).then((data) => {
        // console.log(data)
        dispatch(changeSinger(data))
    })
})

const singer = createSlice({
  name: "singer",
  initialState: {
    singer: {},
    loading:true,
  },
  reducers: {
    changeSinger(state, { payload }) {
      state.singer = payload;
      state.loading = false;
    },
  },
});

export const { changeSinger } = singer.actions;

export default singer.reducer;
