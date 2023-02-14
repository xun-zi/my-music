import {configureStore} from "@reduxjs/toolkit"
import recommendRedcer from "./module/recommend";
import albumReducer from "./module/album";
import playerReducer from "./module/player";
import singersReducer from "./module/singers";







const store = configureStore({
    reducer:{
        recommend:recommendRedcer,
        album:albumReducer,
        player:playerReducer,
        singers:singersReducer
    }
})


export default store; 