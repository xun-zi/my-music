import {configureStore} from "@reduxjs/toolkit"
import recommendRedcer from "./module/recommend";










const store = configureStore({
    reducer:{
        recommend:recommendRedcer
    }
})


export default store; 