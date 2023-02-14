import {configureStore} from "@reduxjs/toolkit"
import recommendRedcer from "./module/recommend";
import albumReducer from "./module/album";
import playerReducer from "./module/player";
import singersReducer from "./module/singers";
import singerReducer from "./module/singer"






const store = configureStore({
    reducer:{
        recommend:recommendRedcer,
        album:albumReducer,
        player:playerReducer,
        singers:singersReducer,
        singer:singerReducer
    }
})


export default store; 