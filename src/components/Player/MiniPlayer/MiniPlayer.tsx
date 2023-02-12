import styled, { keyframes } from "styled-components"
import { currentSong } from "@/mock/player"
import { getName, getSongUrl, isEmptyObject } from "@/api/utils"
import { useDispatch, useSelector } from "react-redux"
import { changePlayer, changeScreen } from "@/store/module/player"
import { useEffect, useRef, useState } from "react"
import { CSSTransition } from "react-transition-group";
import { playList } from "@/mock/player"
import { Wrapper } from "./style"




export default function () {
    const { playing, fullScreen } = useSelector((state: any) => {
        return state.player
    })
    const currentSong = playList[0];
    const dispatch = useDispatch<any>();
    const startPause = (state: boolean, e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        e.stopPropagation();
        dispatch(changePlayer(state));
    };
    const enterHandle = () => {
        dispatch(changeScreen(true));
    }


    

    const miniPlayerRef = useRef<HTMLDivElement | null>(null);

    

    

    const showEl = (<CSSTransition
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
    return (isEmptyObject(currentSong) ? <></> : showEl)
}