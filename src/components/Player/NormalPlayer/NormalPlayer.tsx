import styled from "styled-components"
import { Bottom, Cd, Top, Wrapper } from "./style"
import { getName, getSongUrl, isEmptyObject } from "@/api/utils"
import disc from "./disc.png"
import ProgressBar from "@/components/ProgressBar/ProgressBar"
import { useDispatch, useSelector } from "react-redux"
import { changeCurrentTime, changePlayer, changePlayerState, changeScreen, changeShowPlayList, changeSongIndex, nextSong, preSong, randomPlayer } from "@/store/module/player"
import { CSSTransition } from "react-transition-group"
import { useEffect, useRef, useState } from "react"
import { CurrentSong } from "../type"



type Props = {
    currentSong: CurrentSong
}

export default function (props: Props) {
    const { currentSong } = props;
    const dispatch = useDispatch<any>();
    const backHandle = () => {
        dispatch(changeScreen(false));
    }

    const { playing, fullScreen, currentTime, playerState, playList,songIndex} = useSelector(({ player }: any) => player)

    const startPause = (state: boolean, e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        e.stopPropagation();
        dispatch(changePlayer(state));
    };

    const normalRef = useRef<HTMLDivElement | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    useEffect(() => {
        if (isEmptyObject(currentSong)) return;
        audioRef.current!.src = getSongUrl(currentSong.id)
        // console.log(audioRef.current)
        // setTimeout(() => {
        //     audioRef.current?.play();
        // },1000)
        const audio = audioRef.current!;
        playing ? audio.play() : audio.pause();
    }, [currentSong])
    useEffect(() => {
        if (isEmptyObject(currentSong)) return;
        const audio = audioRef.current!;
        playing ? audio.play() : audio.pause();
    }, [playing])


    const updataTime = (e: any) => {
        // console.log(e.target.currentTime);
        dispatch(changeCurrentTime(e.target.currentTime));
    }


    const onProgressChange = (time: number) => {
        let newTime = time * currentSong.dt / 1000;
        dispatch(changeCurrentTime(newTime));
        audioRef.current!.currentTime = newTime;
    }


    function getPlayerClassNamebyId(state: number) {
        const playState = ['icon-loop', 'icon-random', 'icon-singlecycle'];
        return playState[state]
    }

    function playEndHandle() {
        if (playerState == 0) {
            dispatch(nextSong());
        } else if (playerState == 1) {
            let randomNum = 0;
            do{
               randomNum = Math.random() * playList.length | 0
            } while(songIndex == randomNum);
            dispatch(randomPlayer(randomNum));
        } else {
            audioRef.current!.currentTime = 0;
        }
    }

    const musicListOnclick = (e:React.SyntheticEvent<HTMLSpanElement, Event>) => {
        e.stopPropagation();
        dispatch(changeShowPlayList(true));
    }

    function showEl() {
        return (<CSSTransition
            in={fullScreen}
            classNames="normal"
            timeout={10000}
            onEnter={() => {
                normalRef.current!.style.display = 'block';
            }}

            onExit={() => {
                normalRef.current!.style.display = 'none';
            }}
        >
            <Wrapper ref={normalRef}>
                <div className="background">
                    <img src={currentSong.al.picUrl + "?param=400x400"}></img>
                </div>

                <Top>
                    <div className="top">
                        <span className="iconfont icon-iconfonticonfonti2" onClick={backHandle}></span>
                        <div className="info">
                            <h2 className="name">{currentSong.name}</h2>
                            <p className="author">{getName(currentSong.ar)}</p>
                        </div>
                    </div>
                </Top>

                <Cd url={disc}>
                    <div className="cd-wrap">
                        <div className={playing ? "bg cd" : "cd bg pause"} >
                            <img src={currentSong.al.picUrl + "?param=400x400"} />
                        </div>
                    </div>
                </Cd>

                <Bottom>
                    <div className="bottom">
                        <ProgressBar duration={currentSong.dt} currentTime={currentTime} onProgressChange={onProgressChange} />
                        <div className="operation">
                            <div className="left">
                                <span className={`iconfont ${getPlayerClassNamebyId(playerState)}`} onClick={() => dispatch(changePlayerState((playerState + 1) % 3))}></span>
                            </div>
                            <div className="left">
                                <span className="iconfont icon-play-prev-1" onClick={() => dispatch(preSong())}></span>
                            </div>
                            <div className="center">
                                {
                                    playing
                                        ?
                                        <span className="iconfont icon-pause1" onClick={(e) => startPause(false, e)}></span>
                                        :
                                        <span className="iconfont icon-Player" onClick={(e) => startPause(true, e)}></span>
                                }
                            </div>
                            <div className="right" >
                                <span className="iconfont icon-play-prev-1" style={{ transform: "rotate(180deg)", display: "inline-block" }} onClick={() => dispatch(nextSong())}></span>
                            </div>
                            <div className="right">
                                <span className="iconfont icon-musiclist" onClick={musicListOnclick}></span>
                            </div>
                        </div>
                    </div>
                </Bottom>
                <audio ref={audioRef} style={{ display: "none" }} onTimeUpdate={(e) => updataTime(e)} onEnded={playEndHandle}></audio>
            </Wrapper>
        </CSSTransition>)
    }

    return isEmptyObject(currentSong) ? <></> : showEl();
}