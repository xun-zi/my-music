import {configureStore} from "@reduxjs/toolkit"
import recommendRedcer from "./module/recommend";
import albumReducer from "./module/album";









const store = configureStore({
    reducer:{
        recommend:recommendRedcer,
        album:albumReducer
    }
})


export default store; 