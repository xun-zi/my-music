
import BScroll from 'better-scroll'
import { Children, forwardRef, memo, ReactNode, useEffect, useImperativeHandle, useLayoutEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import PullDown from '@better-scroll/pull-down'

const Scroll = styled.div`
    position:relative;
    height:100%;
    width:100%;
    overflow:hidden;
`
const Test = styled.div`
    height:1000px;
    width:100%;
    background-color:green;
`

type Props = {
    children: ReactNode,
    onScroll?: (pos?: { x: number, y: number }) => any,
    onhandlePullDown?: Function,
    onhandlePullUp?:Function,
    direction?: 'horizontal' | 'vertical',
}

const ScrollEl = forwardRef(function (props: Props, ref) {
    const { onScroll, onhandlePullDown, direction = 'horizontal',onhandlePullUp} = props;
    const wrapperRef = useRef<HTMLDivElement | null>(null);
    const [bs, setBs] = useState<BScroll | null>(null)
    useLayoutEffect(() => {
        const bs = new BScroll(wrapperRef.current!, {
            freeScroll: true,
            pullUpLoad: true,
            scrollX: direction == 'horizontal',
            scrollY: direction == 'vertical',
            disableMouse: true,
            useTransition: true,
            pullDownRefresh: {
                threshold: 800,
                stop: 56,
            },
            zoom: {
                start: 1,
                min: 0.5,
                max: 2
            },
            click: true,
            stopPropagation: true
        })
        setBs(bs);
    }, [])
    useEffect(() => {
        if (!bs) return;
        bs.refresh();
    })
    useEffect(() => {
        if (!bs || !onScroll) return;
        bs.on("scroll",onScroll)
        return () => {
            bs.off("scroll",onScroll)
        }
    }, [bs, onScroll])

    useEffect(() => {
        if (!bs || !onhandlePullUp) return;
        const handlePullUp = () => {
            // console.log("bs.y bs.maxScorllY",bs.y,bs.maxScrollY,bs.y < bs.maxScrollY - 50)
            if(bs.y < bs.maxScrollY - 50){
                onhandlePullUp();
            }
        }
        bs.on("touchEnd",handlePullUp);
        return () => {
            bs.off("touchEnd",handlePullUp)
        }
    }, [bs,onhandlePullUp])

    useEffect(() => {
        if(!bs || !onhandlePullDown)return;
        const handlePullUp = () => {
            // console.log("bs.y",bs.y)
            if(bs.y > 50){
                onhandlePullDown();
            }
        }
        bs.on("touchEnd",handlePullUp)
        return () => {
            bs.off("touchEnd",handlePullUp)
        }
    },[bs,onhandlePullDown])

    useImperativeHandle(ref, () => ({
        refresh() {
            if (bs) {
                bs.refresh();
                bs.scrollTo(0, 0);
            }
        },
        getBScroll() {
            if (bs) {
                return bs;
            }
        }
    }));

    return (<Scroll ref={wrapperRef}>
        {
            props.children
        }
    </Scroll>)
})

export default memo(ScrollEl)