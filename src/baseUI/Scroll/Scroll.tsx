import BScroll from '@better-scroll/core'
import PullUp from '@better-scroll/pull-up'
import { Zoom } from 'better-scroll'
import { Children, memo, ReactNode, useEffect, useLayoutEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import style from "@/assets/global-style"
BScroll.use(Zoom)
BScroll.use(PullUp)

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
}

function ScrollEl(props: Props) {
    const wrapperRef = useRef<HTMLDivElement | null>(null);
    const [bs, setBs] = useState<BScroll | null>(null)

    useLayoutEffect(() => {
        const bs = new BScroll('.scroll-wrapper', {
            freeScroll: true,
            pullUpLoad: true,
            scrollX: true,
            scrollY: true,
            disableMouse: true,
            useTransition: true,
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
    console.log("scrollEl")
    useEffect(() => {
        if (!bs) return;
        bs.refresh();
    })
    // useEffect(() => {
    //     if (!bs) return;
    //     bs.refresh();
    // })

    // useEffect(() => {
    //     const bs = new BScroll('.scroll-wrapper', {
    //         freeScroll: true,
    //         pullUpLoad: true,
    //         scrollX: true,
    //         scrollY: true,
    //         disableMouse: true,
    //         useTransition: true,
    //         zoom: {
    //             start: 1,
    //             min: 0.5,
    //             max: 2
    //         }
    //     })
    //     setBs(bs);
    // }, [])

    return (<Scroll ref={wrapperRef} className="scroll-wrapper">
        {
            props.children
        }
    </Scroll>)
}

export default memo(ScrollEl)