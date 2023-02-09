import { getBannerRequest, getRecommendListRequest } from "@/api/request";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const fetchBannerListDateAction = createAsyncThunk("fetchBannerListDateAction",(payload,{dispatch}) => {
    getBannerRequest().then((data) => {
        dispatch(changeBannerList(data.banners));
    })
    getRecommendListRequest().then((data) => {
        
        dispatch(changeSingerList(data.result))
    })
})

const recommendSlice = createSlice({
    name:'recommend',
    initialState:{
        bannerList:[],
        singerList:[],
    },
    reducers:{
        changeBannerList(state,{payload}){
            state.bannerList = payload
        },
        changeSingerList(state,{payload}){
            state.singerList = payload
        }
    }
})

export const {
    changeBannerList,
    changeSingerList
} = recommendSlice.actions

export default recommendSlice.reducer