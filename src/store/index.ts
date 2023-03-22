import { configureStore } from "@reduxjs/toolkit";
import recommendRedcer from "./module/recommend";
import albumReducer from "./module/album";
import playerReducer from "./module/player";
import singersReducer from "./module/singers";
import singerReducer from "./module/singer";
import rankReducer from "./module/rank";
import searchReducer from "./module/search";

const store = configureStore({
  reducer: {
    recommend: recommendRedcer,
    album: albumReducer,
    player: playerReducer,
    singers: singersReducer,
    singer: singerReducer,
    rank: rankReducer,
    search: searchReducer,
  },
});

export default store;
