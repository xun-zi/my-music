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
  flex-direction: column;
  justify-content: center;
  align-items: center;
  animation: ${rotate} 10s infinite linear;
  &.pause {
    animation-play-state: paused;
  }
  .bg {
    position: relative;
    background-image: url(${(props) => props.url});
    background-size: 100% 100%;
    width: 70%;
    height: 70vw;
    border-radius: 50%;
    z-index: 1;
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
`;

export const Top = styled.div`
  display: flex;
  align-items: center;
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
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: white;
  /* z-index: 1000; */
  .background {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0.6;
    z-index:-1;
    img {
      width: 100vw;
      height: 100vh;
      filter: blur(15px);
    }
  }
`;
