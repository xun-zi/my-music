import { useDispatch, useSelector } from "react-redux";
import { GoodList, Wrapper } from "./style";
import { CSSTransition } from "react-transition-group";
import { changeShowPlayList, selectPlayerSong } from "@/store/module/player";
import { useEffect, useState } from "react";
import { getName } from "@/api/utils";
import { CurrentSong } from "../type";






export default function () {
    const { showPlayList, playList, songIndex, playerState } = useSelector((state: any) => state.player)

    const disptch = useDispatch();
    function WrapperClick() {
        disptch(changeShowPlayList(false))
    }

    const [show, setShow] = useState(showPlayList);
    const listItmClick = (idx: number) => {
        disptch(selectPlayerSong(idx));
    }
    const playerStateName = [{
        svg:"icon-loop",
        name: "顺序"
    }, {
        svg:"icon-random",
        name: "随机"
    }, {
        svg:"icon-singlecycle",
        name: "单曲"
    }]
    return (<CSSTransition
        in={showPlayList}
        className="playList"
        timeout={400}
        onEnter={() => setShow(true)}
        onExited={() => setShow(false)}
    >
        <Wrapper onClick={WrapperClick} style={{ display: show ? "block" : "none" }}>
            <GoodList onClick={(e) => e.stopPropagation()} className="songList">
                <div className="playState">
                    <span className={`iconfont ${playerStateName[playerState].svg}`}></span>
                    {
                        playerStateName[playerState].name + "播放"
                    }
                </div>
                <div className="list">
                    {
                        playList.map((item: CurrentSong, index: number) => {
                            return (
                                <div className="list-item" key={item.id} onClick={() => listItmClick(index)}>
                                    <span className="iconfont icon-Player" style={{ visibility: index == songIndex ? "visible" : "hidden" }}></span>
                                    <span className="name">{item.name + ' - '} + {getName(item.ar)}</span>
                                </div>)
                        })
                    }
                </div>
            </GoodList>
        </Wrapper>
    </CSSTransition>)
}