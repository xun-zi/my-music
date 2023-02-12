import styled, { keyframes } from "styled-components";


const rotate = keyframes`
    0%{
        transform:rotate(0);
    }
    100%{
        transform:rotate(360deg);
    }
`
export const Wrapper = styled.div`
&.mini-enter {
    transform: translate3d(0, 100%, 0);
}
&.mini-enter-active {
    transform: translate3d(0, 0, 0);
    transition: all 0.4s;
}
&.mini-exit-active {
    transform: translate3d(0, 100%, 0);
    transition: all .4s
}
position:fixed;
bottom:0;
width:100%;
height:60px;
z-index:1003;
background:#fff;
transform:translate3d(0,0%,0);
display:flex;
align-items:center;
img{
    border-radius:50%;
    margin-left:20px;
    margin-right:10px;
    animation:${rotate} 10s infinite;

    &.pause{
        animation-play-state:paused;
    }
}
.bg{
    stroke-width: 4px; /* 设置边框宽度 */
    stroke: #461212; /* 设置边框颜色 */
}
.inner {
    stroke-width: 4px; /* 设置边框宽度 */
    stroke: #d44439; /* 设置边框颜色 */
}
.circleWrapper{
    border-radius:50%;
    stroke:rgba(212,68,57,.5);
}
.player{
    position:relative;
    display:flex;
    .iconfont{
        position:absolute;
        left:50%;
        top:50%;
        transform:translate(-50%,-50%);
        color:#d44439;
        font-size:19px;
    }
}

.icon-musiclist{
    font-size:45px;
    color:#d44439;
    margin:0 10px;
}
.desc{
    flex:1;

    .name{
        color:#333;
    }
    .author{
        margin-top:8px;
        color:#999;
        font-size:12px;
    }
}
`