import styled, { keyframes } from "styled-components";

export const Bottom = styled.div`
  position: absolute;
  bottom: 20px;
  width: 100%;
  .operation {
    display: flex;
    width: 100%;
    > div {
      flex: 1;
    }
    .iconfont {
      font-size: 35px;
      font-weight: 300;
    }
    > .left {
      text-align: right;
    }
    > .right {
      text-align: left;
    }
    > .center {
      text-align: center;
      padding: 0 20px;
    }
  }
`;

const rotate = keyframes`
  0%{
    transform:rotate(0deg);
  }
  100%{
    transform:rotate(360deg);
  }
`;

export const Cd = styled.div<{
  url?: string;
}>`
  position: absolute;
  top: 8%;
  bottom: 17%;
  width: 100%;
  display: flex;
  /* display:inline-block; */
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .cd-wrap {
    display: inline-block;
    z-index: 1;
    transform: translate3d(0, 0, 0) scale(1);
  }
  .bg {
    position: relative;
    background-image: url(${(props) => props.url});
    background-size: 100% 100%;
    width: 70vw;
    height: 70vw;
    border-radius: 50%;

    animation: ${rotate} 10s infinite linear;
    &.pause {
      animation-play-state: paused;
    }

    img {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      width: 68%;
      height: 68%;
      margin: auto;
      border-radius: 50%;
    }
  }
  .needle {
    &.pause {
      transform: scaleX(-1) rotate(48deg);
    }
    position: absolute;
    width: 23vw;
    -webkit-transform-origin: left top;
    -ms-transform-origin: left top;
    transform-origin: left top;
    transform: scaleX(-1) rotate(23deg);
    left: 58vw;
    top: -27vw;
    transition: rotate 0.3s;
  }
`;

export const Lyrics = styled.div`
  box-sizing: border-box;
  position: absolute;
  top: 8%;
  bottom: 17%;
  width: 100vw;
  padding: 10% 10%;
  color: #ddd;
  overflow: scroll;
  &::-webkit-scrollbar {
    width: 0 !important;
  }
  /* background-color: black; */
  .lyric {
    &.active {
      color: white;
    }
    text-align: center;
    padding: 10px 0;
  }
`;

export const Top = styled.div`
  display: inline-block;
  .top {
    display: flex;
    align-items: center;
  }
  .iconfont {
    margin-left: 5px;
    display: block;
    padding: 9px;
    font-size: 24px;
    color: #2e3030;
    font-weight: bold;
  }

  .info {
    .name {
      font-size: 17px;
      line-height: 25px;
      font-size: 16px;
      color: #2e3030;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
    .author {
      line-height: 20px;
      font-size: 14px;
      color: #bba8a8;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
  }
`;

export const Wrapper = styled.div<{
  url?: string;
}>`
  display: none;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: white;
  /* z-index: 1000; */

  &.normal-enter .cd-wrap {
    display: inline-block;
    z-index: 1;
    transform: translate3d(calc(-50vw + 40px), calc(50vh - 30px), 0) scale(0.15);
    transition: 0.2s;
  }
  &.normal-enter-active .cd-wrap {
    display: inline-block;
    z-index: 1;
    transform: translate3d(0, 0, 0) scale(1);
  }

  &.normal-enter .top {
    transform: translate3d(0, -100%, 0);
    transition-delay: 0.2s;
    transition: 0.4s;
  }

  &.normal-enter-active .top {
    transform: translate3d(0, 0, 0);
  }

  &.normal-enter .bottom {
    transform: translate3d(0, 100%, 0);
    transition-delay: 0.2s;
    transition: 0.4s;
  }

  &.normal-enter-active .bottom {
    transform: translate3d(0, 0, 0);
  }

  .background {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0.6;
    z-index: -1;
    img {
      width: 100vw;
      height: 100vh;
      filter: blur(15px);
    }
    .before {
      content: "";
      position: absolute;
      z-index: 1;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background-color: rgba(0, 0, 0, 0.2);
    }
  }
`;
