import { getCount, getName } from "@/api/utils";
import { changePlayer, changePlayList, selectPlayerSong } from "@/store/module/player";
import { useDispatch } from "react-redux";
import { CurrentSong } from "../Player/type";
import { List, ListItem } from "./style";




function SongList(porps: { data: CurrentSong[], subscribedCount?: number }) {
    const { data, subscribedCount } = porps;

    const dispatch = useDispatch<any>();

    const ListItemClick = (index: number) => {
        dispatch(changePlayList(data))
        dispatch(selectPlayerSong(index))
        dispatch(changePlayer(true));
    }
    return <List>
        <div className="Top">
            <span className="iconfont icon-Player"></span>
            <span className="prefix">播放全部</span>
            <span className="count">(共{getCount(data.length)}首)</span>
            {
                subscribedCount
                &&
                (<div className="collect">
                    <span className="iconfont icon-add"></span>
                    <span className="Num">收藏({getCount(subscribedCount)})</span>
                </div>)
            }
        </div>
        {
            data.map((item, index) => {
                return (<ListItem key={index} onClick={() => { ListItemClick(index) }}>
                    <div className="idx">{index + 1}</div>
                    <div className="singer">
                        <div className="name">{item.name}</div>
                        <div className="ly">{item.al.name + ' - ' + getName(item.ar)}</div>
                    </div>
                </ListItem>)
            })
        }
    </List>
}


export default SongList