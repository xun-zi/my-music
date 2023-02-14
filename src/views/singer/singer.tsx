import Scroll from "@/baseUI/Scroll/Scroll";
import Header from "@/components/Header/Header";
import PageTransition from "@/components/pageTransition";
import SongList from "@/components/songList/songList";
import { fetchSingerDataAction } from "@/store/module/singer";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { BgImg, HeaderWrapper, Pla, ScrollWrapper, SingerButton, Wrapper } from "./style";







export default function () {

    const [showStatus, setShowStatus] = useState(true);
    const params = useParams();

    const dispatch = useDispatch<any>();
    const { singer, loading } = useSelector(({ singer }: any) => {
        console.log(singer)
        return singer
    })
    useEffect(() => {
        dispatch(fetchSingerDataAction(params.id!))
    }, [])

    const plaRef = useRef<HTMLDivElement | null>(null);
    const BgImgRef = useRef<HTMLDivElement | null>(null)
    const btnRef = useRef<HTMLDivElement | null>(null);
    const songListWrapperRef = useRef<HTMLDivElement | null>(null);
    const whiteBoardRef = useRef<HTMLDivElement | null>(null);
    const ScrollHandle = (pos: { x: number, y: number }) => {
        const pla = plaRef.current!;
        const bgImg = BgImgRef.current!;
        const btn = btnRef.current!;
        const whiteBoard = whiteBoardRef.current!;
        const y = pos.y;
        const bgImgHeight = bgImg.clientHeight;
        const instance = bgImgHeight - 42;
        if (y >= 0) {
            const percentage = 1 + y / bgImgHeight;
            bgImg.style.transform = `scale(${percentage})`;
            btn.style.transform = `translate3d(0,${y}px,0)`;
            whiteBoard.style.transform = `translate3d(0,${y + 10}px,0)`;

        } else{
            btn.style.opacity = 1 + y / instance + '';
            btn.style.transform = `translate3d(0,${y}px,0)`;
            whiteBoard.style.transform = `translate3d(0,${y + 10}px,0)`;
        }
    }
    const showEl = () => {
        return (<PageTransition showStatus={showStatus}>
            <Wrapper >
                <HeaderWrapper url={singer.artist.picUrl}><Header title={singer.artist.name} onBack={() => setShowStatus(false)} /></HeaderWrapper>
                <BgImg ref={BgImgRef} url={singer.artist.picUrl}></BgImg>
                <Pla ref={plaRef} />
                <SingerButton ref={btnRef}>
                    <div>
                        <span className="iconfont icon-add"></span>
                        <p>收藏</p>
                    </div>
                </SingerButton>
                <div className="songListWrapper" ref={songListWrapperRef}>
                    <ScrollWrapper >
                        <Scroll onScroll={ScrollHandle} overflow={false}>
                            <SongList data={singer.hotSongs} />
                        </Scroll>
                    </ScrollWrapper>
                    <div className="whiteBoard" ref={whiteBoardRef}></div>
                </div>
            </Wrapper>
        </PageTransition>)
    }

    // return loading ? <div></div> : showEl();
    return loading ? <div /> : showEl();
}