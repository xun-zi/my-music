import styled from "styled-components"
import { Bottom, Cd, Top, Wrapper } from "./style"
import { currentSong } from "@/mock/player"
import { getName, getSongUrl, isEmptyObject } from "@/api/utils"
import disc from "./disc.png"
import ProgressBar from "@/components/ProgressBar/ProgressBar"
import { useDispatch, useSelector } from "react-redux"
import { changePlayer, changeScreen } from "@/store/module/player"
import { CSSTransition } from "react-transition-group"
import { useEffect, useRef, useState } from "react"
import { playList } from "@/mock/player"





export default function () {
    const currentSong = playList[0];
    const dispatch = useDispatch<any>();
    const backHandle = () => {
        dispatch(changeScreen(false));
    }

    const { playing, fullScreen } = useSelector(({ player }: any) => player)

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
    }, [])
    useEffect(() => {
        const audio = audioRef.current!;
        playing ? audio.play() : audio.pause();
    },[playing])
    const [currentTime,setCurrentTime] = useState(0);

    const updataTime = (e:any) => {
        // console.log(e.target.currentTime);
        setCurrentTime(e.target.currentTime);
    }


    const onProgressChange = (time:number) => {
        let newTime = time*currentSong.dt/1000;
        setCurrentTime(newTime);
        audioRef.current!.currentTime = newTime;
    }

    const ShowEL = (<CSSTransition
        in={fullScreen}
        classNames="normal"
        timeout={1000}
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
                    <ProgressBar duration={currentSong.dt}  currentTime={currentTime} onProgressChange={onProgressChange}/>
                    <div className="operation">
                        <div className="left">
                            <span className="iconfont icon-heart"></span>
                        </div>
                        <div className="left">
                            <span className="iconfont icon-play-prev-1"></span>
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
                            <span className="iconfont icon-play-prev-1" style={{ transform: "rotate(180deg)", display: "inline-block" }}></span>
                        </div>
                        <div className="right">
                            <span className="iconfont icon-musiclist"></span>
                        </div>
                    </div>
                </div>
            </Bottom>
            <audio ref={audioRef} style={{ display: "none" }} onTimeUpdate={(e) => updataTime(e)}></audio>
        </Wrapper>
    </CSSTransition>)
    
    return isEmptyObject(currentSong) ? <></> : ShowEL;
}