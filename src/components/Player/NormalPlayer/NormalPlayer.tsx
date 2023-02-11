import styled from "styled-components"
import { Bottom, Cd, Top, Wrapper } from "./style"
import { currentSong } from "@/mock/player"
import { getName } from "@/api/utils"
import disc from "./disc.png"
import ProgressBar from "@/components/ProgressBar/ProgressBar"
import { useDispatch, useSelector } from "react-redux"
import { changePlayer, changeScreen } from "@/store/module/player"





export default function () {

    const dispatch = useDispatch<any>();

    const backHandle = () => {
        dispatch(changeScreen(false));
    }

    const { playing } = useSelector(({ player }: any) => player)
    
    const startPause = (state: boolean, e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        e.stopPropagation();
        dispatch(changePlayer(state));
    };
    return (<Wrapper>
        <div className="background">
            <img src={currentSong.al.picUrl + "?param=400x400"}></img>
        </div>
        <Top>
            <span className="iconfont icon-iconfonticonfonti2" onClick={backHandle}></span>
            <div className="info">
                <h2 className="name">{currentSong.name}</h2>
                <p className="author">{getName(currentSong.ar)}</p>
            </div>
        </Top>
        <Cd className={playing ? "" : "pause"} url={disc}>
            <div className="bg">
                <img src={currentSong.al.picUrl + "?param=400x400"} />
            </div>
        </Cd>

        <Bottom>
            <ProgressBar />
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
                            <span className="iconfont icon-pause1" onClick={(e) => startPause(false,e)}></span>
                            :
                            <span className="iconfont icon-Player" onClick={(e) => startPause(true,e)}></span>
                    }
                </div>
                <div className="right" >
                <span className="iconfont icon-play-prev-1" style={{transform:"rotate(180deg)",display:"inline-block"}}></span>
                </div>
                <div className="right">
                    <span className="iconfont icon-musiclist"></span>
                </div>
            </div>
        </Bottom>
    </Wrapper>)
}