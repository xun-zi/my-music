import {configureStore} from "@reduxjs/toolkit"
import recommendRedcer from "./module/recommend";
import albumReducer from "./module/album";
import playerReducer from "./module/player";








const store = configureStore({
    reducer:{
        recommend:recommendRedcer,
        album:albumReducer,
        player:playerReducer
    }
})


export default store; 