import styled from "styled-components"
import { Bottom, Cd, Lyrics, Top, Wrapper } from "./style"
import { getName, getSongUrl, isEmptyObject } from "@/api/utils"
import disc from "./disc.png"
import needle from "./needle.png"
import ProgressBar from "@/components/ProgressBar/ProgressBar"
import { useDispatch, useSelector } from "react-redux"
import { changelyrics, changePlayer, changePlayerState, changeScreen, changeShowPlayList, changeSongIndex, nextSong, preSong, randomPlayer } from "@/store/module/player"
import { CSSTransition } from "react-transition-group"
import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { CurrentSong } from "../type"
import { getLyricsRequest } from "@/api/request"



type Props = {
    currentSong: CurrentSong,
    currentTime: number,
    setCurrentTime: (currentTime: number) => void
}

export default function (props: Props) {
    const { currentSong, setCurrentTime } = props;
    const dispatch = useDispatch<any>();
    useEffect(() => {
        if (!currentSong.id) return
        getLyricsRequest(currentSong.id).then((res: any) => {
            // console.log('lyrics', res);
            dispatch(changelyrics(res.lrc.lyric));
        })
    }, [currentSong])
    const backHandle = () => {
        dispatch(changeScreen(false));
    }
    const { currentTime } = props;
    const { playing, fullScreen, playerState, playList, songIndex, lyrics } = useSelector(({ player }: any) => player)


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
        setCurrentTime(e.target.currentTime)
    }


    const onProgressChange = (time: number) => {
        let newTime = time * currentSong.dt / 1000;
        setCurrentTime(newTime)
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
            do {
                randomNum = Math.random() * playList.length | 0
            } while (songIndex == randomNum);
            dispatch(randomPlayer(randomNum));
        } else {
            audioRef.current!.currentTime = 0;
            audioRef.current!.play();
        }
    }

    const musicListOnclick = (e: React.SyntheticEvent<HTMLSpanElement, Event>) => {
        e.stopPropagation();
        dispatch(changeShowPlayList(true));
    }
    const lyricWrapperRef = useRef<HTMLDivElement | null>(null);
    const lyricHeightsRef = useRef<number[]>([]);
    useEffect(() => {
        setTimeout(() => {
            const divs = lyricWrapperRef.current?.querySelectorAll('div');
            if (!divs) return;
            // console.log('等待')
            if (divs[0].clientHeight === 0) return;

            // console.log(divs[0].clientHeight);
            let arr: any = [];
            Array.from(divs).forEach((div) => {
                arr.push(div.clientHeight);
            })
            let pre = 0;
            for (let i = 0; i < arr.length; i++) {
                pre += arr[i];
                arr[i] = pre;
            }
            lyricHeightsRef.current = arr;
        }, 3000)
    }, [lyrics]);
    const lyricWrapper = lyricWrapperRef.current!;
    const lyricHeights = lyricHeightsRef.current;
    const [lyricPos, setLyricPos] = useState(0);

    useEffect(() => {
        let pos = 0;
        for (let i = 0; i < lyrics.length; i++) {
            if (currentTime < lyrics[i].time) {
                pos = Math.max(0, i - 1);
                break;
            }
            pos = i;
        }
        // console.log("currentTime pos posTime", currentTime, pos, lyrics[pos]?.time)
        // console.log('pos', pos)
        // if (pos != lyricPos) console.log('pos currentTime lyrics ', pos, currentTime, lyrics)
        setLyricPos(pos);
    }, [currentTime])
    const autoScroll = useRef<null | number>(null);
    if (!autoScroll.current && lyricHeights[lyricPos]) lyricWrapper.scrollTop = lyricHeights[lyricPos] - 100;
    const lyScorllEv = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        if (autoScroll.current) clearTimeout(autoScroll.current);
        autoScroll.current = setTimeout(() => {
            autoScroll.current = null
        }, 3000);
    }
    const LyricsEl = () => {

        return (<Lyrics style={{ visibility: !isCd ? 'visible' : 'hidden' }} onClick={() => setIsCd(true)} ref={lyricWrapperRef} onScroll={lyScorllEv}>
            {
                lyrics.map((item: { time: number, lyric: string }, index: number) => {
                    return (<div className={`lyric ${lyricPos == index ? 'active' : ''}`} key={index}>{item.lyric} </div>)
                })
            }
        </Lyrics>)
    }

    const [isCd, setIsCd] = useState(true);
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
                    <div className="before"></div>
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

                <Cd url={disc} style={{ visibility: isCd ? 'visible' : 'hidden' }} onClick={() => setIsCd(false)}>
                    <div className="cd-wrap">
                        <div className={playing ? "bg cd" : "cd bg pause"} >
                            <img src={currentSong.al.picUrl + "?param=400x400"} />
                        </div>
                        <img className={`needle ${playing ? '' : 'pause'}`} src={needle}></img>
                    </div>
                </Cd>

                {
                    LyricsEl()
                }


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