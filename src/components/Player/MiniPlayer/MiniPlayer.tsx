import styled, { keyframes } from "styled-components"
import { currentSong } from "@/mock/player"
import { getName } from "@/api/utils"
import { useDispatch, useSelector } from "react-redux"
import { changePlayer, changeScreen } from "@/store/module/player"
import { useRef, useState } from "react"
import { CSSTransition } from "react-transition-group";
const rotate = keyframes`
    0%{
        transform:rotate(0);
    }
    100%{
        transform:rotate(360deg);
    }
`

const Wrapper = styled.div`
    &.mini-enter {
        transform: translate3d(0, 100%, 0);
    }
    &.mini-enter-active {
        transform: translate3d(0, 0, 0);
        transition: all 0.4s;
    }
    &.mini-exit-active {
        transform: translate3d(0, 100%, 0);
        transition: all .4s
    }
    position:fixed;
    bottom:0;
    width:100%;
    height:60px;
    z-index:1003;
    background:#fff;
    transform:translate3d(0,0%,0);
    display:flex;
    align-items:center;
    img{
        border-radius:50%;
        margin-left:20px;
        margin-right:10px;
        animation:${rotate} 10s infinite;

        &.pause{
            animation-play-state:paused;
        }
    }
    .bg{
        stroke-width: 4px; /* 设置边框宽度 */
        stroke: red; /* 设置边框颜色 */
    }
    .inner {
        stroke-width: 4px; /* 设置边框宽度 */
        stroke: #d44439; /* 设置边框颜色 */
    }
    .circleWrapper{
        border-radius:50%;
        stroke:rgba(212,68,57,.5);
    }
    .player{
        position:relative;
        display:flex;
        .iconfont{
            position:absolute;
            left:50%;
            top:50%;
            transform:translate(-50%,-50%);
            color:#d44439;
            font-size:19px;
        }
    }

    .icon-musiclist{
        font-size:45px;
        color:#d44439;
        margin:0 10px;
    }
    .desc{
        flex:1;

        .name{
            color:#333;
        }
        .author{
            margin-top:8px;
            color:#999;
            font-size:12px;
        }
    }
`


export default function () {
    const { playing, fullScreen } = useSelector((state: any) => {
        return state.player
    })

    const dispatch = useDispatch<any>();
    const startPause = (state: boolean, e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        e.stopPropagation();
        dispatch(changePlayer(state));
    };
    const enterHandle = () => {
        dispatch(changeScreen(true));
    }

    // const [playing,setPlaying] = useState(false);
    // const startPause = (state:boolean) => setPlaying(state)
    const miniPlayerRef = useRef<HTMLDivElement | null>(null);
    return (<CSSTransition
        in={!fullScreen}
        timeout={4000}
        classNames="mini"
        onEnter={() => {
            miniPlayerRef.current!.style.display = "flex";
        }}
        onExited={() => {
            miniPlayerRef.current!.style.display = "none";
        }}>
        <Wrapper onClick={enterHandle} ref={miniPlayerRef}>
            <img src={currentSong.al.picUrl} width="40" height="40" className={playing ? "" : "pause"} />
            <div className="desc" >
                <h2 className="name">{currentSong.name}</h2>
                <p className="author">{getName(currentSong.ar)}</p>
            </div>
            <div className="player">
                <svg width="32" height="32" className="circleWrapper">
                    <circle r="16" cx="16" cy="16" fill="transparent" className="bg" />
                    <circle
                        r="16"
                        cx="16"
                        cy="16"
                        fill="transparent"
                        className="inner"
                        strokeDasharray="100"
                        strokeDashoffset="10"
                    />
                </svg>
                {
                    playing
                        ?
                        <span className="iconfont icon-pause" onClick={(e) => startPause(false, e)}></span>
                        :
                        <span className="iconfont icon-player-play" onClick={(e) => startPause(true, e)}></span>
                }
            </div>
            <span className="iconfont icon-musiclist"></span>
        </Wrapper>
    </CSSTransition>)
}