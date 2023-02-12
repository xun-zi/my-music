import MiniPlayer from "./MiniPlayer/MiniPlayer";
import NormalPlayer from "./NormalPlayer/NormalPlayer";
import { currentSong, playList } from "@/mock/player";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { switchToPlayList } from "@/store/module/player";
import { getAlbumDetailRequest, getRecommendListRequest } from "@/api/request";


export default function () {
    const {currentSong} = useSelector((state:any) => state.player)
    const dispatch = useDispatch();
    useEffect(() => {
        getAlbumDetailRequest(156934569).then((data:any) => {
            dispatch(switchToPlayList(data.playlist.tracks))
        })
    },[])
    
    return (<>
        <NormalPlayer currentSong={currentSong}/>
        <MiniPlayer currentSong={currentSong}/>
    </>)
}