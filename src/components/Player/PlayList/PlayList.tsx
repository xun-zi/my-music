import { useDispatch, useSelector } from "react-redux";
import { GoodList, Wrapper } from "./style";
import { CSSTransition } from "react-transition-group";
import { changeShowPlayList, selectPlayerSong } from "@/store/module/player";
import { useEffect, useRef, useState } from "react";
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
        svg: "icon-loop",
        name: "顺序"
    }, {
        svg: "icon-random",
        name: "随机"
    }, {
        svg: "icon-singlecycle",
        name: "单曲"
    }]


    const WrapperRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        WrapperRef.current!.style.transform = "translate3d(0, 100%, 0)"
    }, [])
    const TouchData = useRef({
        startPosY: 0,
        curPosY:0,
        drawing: false,
        WrapperCurPosY: 0,
        isScrollTop: true,
    })
    function listDrawEv(e: React.UIEvent<HTMLDivElement, UIEvent>) {
        // console.log(e.currentTarget.scrollTop)
        let current = TouchData.current!;
        if (current.drawing && current.curPosY - current.startPosY < 0) {
            e.preventDefault();
        }
        if (e.currentTarget.scrollTop == 0) current.isScrollTop = true;
        else current.isScrollTop = false;
    }
    const GoodListDrawEv: Record<string, (e: React.TouchEvent<HTMLDivElement>) => any> = {
        onTouchStart(e) {
            console.log("onTouchStart")
            let current = TouchData.current;
            current.drawing = true;
            // console.log(e.touches[0].pageY);
            current.startPosY = e.touches[0].pageY;
            const Wrapper = WrapperRef.current!;
            Wrapper.style.transition = ""
        },
        onTouchMove(e) {
            console.log("onTouchMove")
            let current = TouchData.current;
            const Wrapper = WrapperRef.current!;
            if (!current.isScrollTop) {
                current.startPosY = e.touches[0].pageY;
                return;
            }
            current.curPosY = e.touches[0].pageY;
            let offset = current.curPosY - current.startPosY;

            // console.log("e.touches[0].pageY current.startPosY", e.touches[0].pageY,current.startPosY)
            // console.log(offset)
            Wrapper.style.transform = `translate3d(0, ${Math.max(0, offset)}px, 0)`;
            current.WrapperCurPosY = offset;
        },
        onTouchEnd(e) {
            let current = TouchData.current;
            const Wrapper = WrapperRef.current!;
            if (current.WrapperCurPosY > 220) {
                disptch(changeShowPlayList(false))
                console.log("disptch(changeShowPlayList(false))")
            } else {
                Wrapper.style.transform = `translate3d(0,0, 0)`
            }
            current.drawing = false;
            Wrapper.style.transition = "0.4s"
        }
    }


    return (<CSSTransition
        in={showPlayList}
        className="playList"
        timeout={400}
        onEnter={() => {
            const Wrapper = WrapperRef.current!;
            Wrapper.style.visibility = "visible";
            Wrapper.style.transform = "translate3d(0, 0px, 0)"
        }}
        onExit={() => {
            const Wrapper = WrapperRef.current!;
            Wrapper.style.transform = "translate3d(0, 100%, 0)"
            Wrapper.style.visibility = "hiddle";
        }}
    >
        <Wrapper onClick={WrapperClick} ref={WrapperRef}>
            <GoodList onClick={(e) => e.stopPropagation()} className="songList"
                onTouchStart={GoodListDrawEv.onTouchStart}
                onTouchMove={GoodListDrawEv.onTouchMove}
                onTouchEnd={GoodListDrawEv.onTouchEnd}
            >
                {/* 播放方式 */}
                <div className="playState">
                    <span className={`iconfont ${playerStateName[playerState].svg}`}></span>
                    {
                        playerStateName[playerState].name + "播放"
                    }
                </div>
                {/* 歌单 */}
                <div className="list"
                    onScroll={listDrawEv}
                >
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