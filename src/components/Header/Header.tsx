import styled from "styled-components"
import style from "@/assets/global-style"
import { ReactNode } from "react"
import Marquee from "react-fast-marquee";


const Wrapper = styled.div`
    --gradient-color: ;
    height:40px;
    display:flex;
    align-items:center;
    /* background-color:${style["theme-color"]}; */
    padding:0 10px;
    color:#ddd;
    .iconfont{
        font-size:20px;
    }
    h1{
        font-size: 16px;
        font-weight: 700;
    }
    .overlay{
        display:none;
    }
    .Marquee{
        h1{
            margin-left:100%;
            white-space:nowrap;
        }
    }
`

type Props = {
    children?: ReactNode,
    onBack?: React.MouseEventHandler<HTMLSpanElement>,
    title: string,
    isScroll?: boolean,
}

export default function (porps: Props) {
    const { onBack, title, isScroll } = porps;

    return (<Wrapper>
        <span className="iconfont icon-fenxiang" onClick={onBack}></span>
        {
            isScroll ? <Marquee className="Marquee"><h1>{title}</h1></Marquee> :
                <h1>{title}</h1>
        }
    </Wrapper>)
}