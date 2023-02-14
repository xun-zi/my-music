import { getHotSingerListRequest } from "@/api/request";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";






export const fetchSingerListAction = createAsyncThunk("fetchSingerListAction",(payload,{dispatch}) => {
    getHotSingerListRequest().then(({artists}) => {
        dispatch(changeSingerList(artists));
    })
})




const singersSlice = createSlice({
    name:"singers",
    initialState:{
        singerList:[]
    },
    reducers:{
        changeSingerList(state,{payload}){
            state.singerList = payload
        }
    }
})


export const {changeSingerList} = singersSlice.actions

export default singersSlice.reducer