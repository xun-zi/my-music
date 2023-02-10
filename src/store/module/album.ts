import { getAlbumDetailRequest } from "@/api/request"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"


export const fetchAlbumDataAction = createAsyncThunk("fetchAlbumDataAction",(id:number|string,{dispatch}) => {
    getAlbumDetailRequest(id).then((data:any) => {
        console.log(id)
        console.log(data.playlist);
        dispatch(changeCurrentAlbum(data.playlist))
    })
})


const albumSlice = createSlice({
    name:"album",
    initialState:{
        currentAlbum:{},
        loading:true
    },
    reducers:{
        changeCurrentAlbum(state,{payload}){
            state.currentAlbum = payload
            state.loading = false;
        }
    }
})

export const {
    changeCurrentAlbum
} = albumSlice.actions;

export default albumSlice.reducer;