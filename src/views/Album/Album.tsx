import Header from "@/components/Header/Header";
import ImgR from "@/components/ImgR";
import PageTransition from "@/components/pageTransition"
import { memo, useEffect, useRef, useState, useTransition } from "react"
import style from "@/assets/global-style"
import { Bg, Desc, List, ListItem, Operation } from "./style";
import { getCount, getName } from "@/api/utils";
import { useDispatch, useSelector } from "react-redux";
import { fetchAlbumDataAction } from "@/store/module/album";
import { useParams } from "react-router-dom";
import { CurrentAlbum } from "@/api/type";
import { changePlayer, changePlayList, selectPlayerSong} from "@/store/module/player";



function Album() {
    const [showStatus, setShowStatus] = useState(true);
    const dispatch = useDispatch();
    const Params = useParams();
    useEffect(() => {
        if (!Params.id) return;
        dispatch(fetchAlbumDataAction(Params.id) as any)
    }, [])

    const { currentAlbum, loading } = useSelector((state: any) => {
        // console.log("state.album)", state.album)
        return {
            currentAlbum: state.album.currentAlbum as CurrentAlbum,
            loading: state.album.loading as boolean
        }
    })

    const OperationEl = () => {

        return (<Operation>
            <div>
                <span className="iconfont icon-comments"></span>
                <div>评论</div>
            </div>
            <div>
                <span className="iconfont icon-heart"></span>
                <div>点赞</div>
            </div>
            <div>
                <span className="iconfont icon-add"></span>
                <div>收藏</div>
            </div>
            <div>
                <span className="iconfont icon-more"></span>
                <div>更多</div>
            </div>
        </Operation>)
    }
    const GoodList = () => {
        const ListItemClick = (index:number) => {
            dispatch(changePlayList(currentAlbum.tracks))
            dispatch(selectPlayerSong(index))
            dispatch(changePlayer(true));
        }
        return <List>
            <div className="Top">
                <span className="iconfont icon-Player"></span>
                <span className="prefix">播放全部</span>
                <span className="count">(共{getCount(currentAlbum.tracks.length)}首)</span>
                <div className="collect">
                    <span className="iconfont icon-add"></span>
                    <span className="Num">收藏({getCount(currentAlbum.subscribedCount)})</span>
                </div>
            </div>
            {
                currentAlbum.tracks.map((item, index) => {
                    return (<ListItem key={index} onClick={()=>{ListItemClick(index)}}>
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
    console.log("Album", currentAlbum)
    const scrollRef = useRef<HTMLDivElement | null>(null);
    const HeaderRef = useRef<HTMLDivElement | null>(null);
    const [isScroll, setIsScroll] = useState(false);
    useEffect(() => {
        scrollRef.current!.onscroll = function (e) {
            const top = scrollRef.current!.scrollTop;
            const Header = HeaderRef.current!
            if (top < 44) {
                Header.style.visibility = "visible"
                Header.style.backgroundColor = "";
                setIsScroll(false);
                Header.style.opacity = '1';
            } else if (top < 50) {
                Header.style.visibility = "hidden"
                Header.style.backgroundColor = "";
                setIsScroll(true);
                Header.style.opacity = '1';
            } else {
                setIsScroll(true);
                Header.style.visibility = "visible"
                Header.style.backgroundColor = style["theme-color"];
                Header.style.opacity = Math.min(1, (top - 50) / 100) + "";
            }
        }
    }, [])

    const ShowEL = () => (<>
        <div style={{ position: "fixed", width: "100%", zIndex: 1000 }} ref={HeaderRef}>
            <Header onBack={() => setShowStatus(false)} title={isScroll ? currentAlbum.name : "歌单"} isScroll={isScroll} />
        </div>
        <Desc >
            <Bg url={currentAlbum.coverImgUrl}>
                <div className="filter"></div>
            </Bg>
            <ImgR width="120px" singer={{
                picUrl: currentAlbum.coverImgUrl,
                playCount: currentAlbum.subscribedCount
            }} />
            <div className="desc">
                <div className="title">{currentAlbum.name}</div>
                <div className="user">
                    <img src={currentAlbum.creator.avatarUrl} />
                    <span>{currentAlbum.creator.nickname}</span>
                </div>
            </div>
        </Desc>
        {
            OperationEl()
        }
        {
            GoodList()
        }
    </>)


    return (<PageTransition showStatus={showStatus} ref={scrollRef}>
        {
            loading ? "loading" : ShowEL()
        }
    </PageTransition>)
}

export default memo(Album)