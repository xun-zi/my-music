import MiniPlayer from "./MiniPlayer/MiniPlayer";
import NormalPlayer from "./NormalPlayer/NormalPlayer";
import { currentSong, playList } from "@/mock/player";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAlbumDetailRequest, getRecommendListRequest } from "@/api/request";
import PlayList from "./PlayList/PlayList";


export default function () {
    const {currentSong} = useSelector((state:any) => state.player)
    const dispatch = useDispatch();
    // useEffect(() => {
    //     getAlbumDetailRequest(156934569).then((data:any) => {
    //         dispatch(switchToPlayList(data.playlist.tracks))
    //     })
    // },[])
    const [currentTime,setCurrentTime] = useState(0);
    return (<>
        <NormalPlayer currentSong={currentSong} currentTime={currentTime} setCurrentTime={setCurrentTime}/>
        <MiniPlayer currentSong={currentSong} currentTime={currentTime}/>
        <PlayList/>
    </>)
}