import {configureStore} from "@reduxjs/toolkit"
import testSlice from "./module/test"











const store = configureStore({
    reducer:{
        test:testSlice
    }
})


export default store; 