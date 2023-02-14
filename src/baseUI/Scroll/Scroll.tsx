
import BScroll from 'better-scroll'
import { Children, forwardRef, memo, ReactNode, useEffect, useImperativeHandle, useLayoutEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import PullDown from '@better-scroll/pull-down'

const Scroll = styled.div`
    position:relative;
    height:100%;
    width:100%;
    overflow:${(props: { overflow: any }) => props.overflow};
`
const Test = styled.div`
    height:1000px;
    width:100%;
    background-color:green;
`

type Props = {
    children: ReactNode,
    onScroll?: (pos: { x: number, y: number }) => any,
    onhandlePullDown?: Function,
    onhandlePullUp?: Function,
    direction?: 'horizontal' | 'vertical',
    overflow?: boolean,
    refresh?: boolean
}

const ScrollEl = forwardRef(function (props: Props, ref) {
    const { onScroll, onhandlePullDown, direction = 'horizontal', onhandlePullUp, overflow = true, refresh = true } = props;
    const wrapperRef = useRef<HTMLDivElement | null>(null);
    const [bs, setBs] = useState<BScroll | null>(null)
    useLayoutEffect(() => {
        const bs = new BScroll(wrapperRef.current!, {
            freeScroll: true,
            pullUpLoad: {
                threshold: 0
            },
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
            stopPropagation: true,
        })
        setBs(bs);
    }, [])
    useLayoutEffect(() => {
        bs?.refresh();
    })
    useEffect(() => {
        if (!bs || !onScroll) return;
        bs.on("scroll", onScroll)
        return () => {
            bs.off("scroll", onScroll)
        }
    }, [bs, onScroll])

    useEffect(() => {
        if (!bs || !onhandlePullUp) return;
        const handlePullUp = () => {
            if (bs.y < bs.maxScrollY - 50) {
                onhandlePullUp();
            }
        }
        bs.on("touchEnd", handlePullUp);
        return () => {
            bs.off("touchEnd", handlePullUp)
        }
    }, [bs, onhandlePullUp])

    useEffect(() => {
        if (!bs || !refresh) return;
        const refreshEv = () => {
            if (bs.y < bs.maxScrollY) {
                // console.log(bs.y, bs.maxScrollY, "pullingUp")
                bs.refresh();
            }
        }
        bs.on("pullingUp", refreshEv);
        return () => {
            bs.off("pullingUp", refreshEv)
        }
    }, [bs,refresh]);

    useEffect(() => {
        if (!bs || !onhandlePullDown) return;
        const handlePullUp = () => {
            // console.log("bs.y",bs.y)
            if (bs.y > 50) {
                onhandlePullDown();
            }
        }
        bs.on("pullingUp", handlePullUp)
        return () => {
            bs.off("pullingUp", handlePullUp)
        }
    }, [bs, onhandlePullDown])

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

    return (<Scroll ref={wrapperRef} overflow={overflow ? "hidden" : "visible"} >
        {
            props.children
        }
    </Scroll>)
})

export default memo(ScrollEl)