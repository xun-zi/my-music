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

    /**
     * 动画分析
     * 1.动画下拉时上面的图片会变大
     * 2.在没有触摸到顶部时，List是会向上走的
     * 3.触碰到顶部时，不再下拉，而是内部的自我滚动 | 头部无法被滚动页面遮挡住
     * 
     * 实现
     * 1.顶部图片为绝对定位 图层为-1
     * 2.歌单由背景"白板"(whiteBoard)和背景为透明的"歌单"(ScrollWrapper)组成且都为绝对定位 图层为0  --- 注 由于better-scroll只要不是有overflow=hidden滚动时，在顶部上面的内容不被图层遮挡时会显示出来
     * 3.将Header的背景设置成与顶部背景一样，避免歌单向上移动到顶部时，背景是歌单 图层为1
     */

    const BgImgRef = useRef<HTMLDivElement | null>(null)
    const btnRef = useRef<HTMLDivElement | null>(null);
    const whiteBoardRef = useRef<HTMLDivElement | null>(null);
    const ScrollHandle = (pos: { x: number, y: number }) => {
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
        } else {
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
                <Pla />
                <SingerButton ref={btnRef}>
                    <div>
                        <span className="iconfont icon-add"></span>
                        <p>收藏</p>
                    </div>
                </SingerButton>
                <div className="songListWrapper" >
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