import styled from "styled-components";

export const Wrapper = styled.div`
  position: absolute;
  z-index: -3;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;

  .songListWrapper {
    position: absolute;
    top: 40px;
    bottom: 0;
    width: 100%;
    z-index: 100;
    overflow: hidden;
    .whiteBoard {
      background-color: white;
      position: fixed;
      width: 100%;
      top: calc(75vw + 4px);
      bottom: 0;
      height:10000px;
      border-radius:10px 10px 0 0;
    }
  }
`;

export const HeaderWrapper = styled.div<{
  url: string;
}>`
  overflow: hidden;
  position: fixed;
  z-index: 10000;
  top: 0;
  width: 100%;
  background-image: url(${(props) => props.url});
  background-size: cover;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    z-index: -10;
    width: 100vw;
    height: 100%;
    background: rgba(7, 17, 27, 0.3);
    z-index:-10;
  }
`;

export const BgImg = styled.div<{
  url: string;
}>`
  position: absolute;
  z-index: -1;
  top: 0;
  width: 100%;
  height: 0;
  padding-top: 75%;
  background-image: url(${(props) => props.url});
  background-size: cover;
  transform-origin: top;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    z-index: -0.5;
    width: 100vw;
    height: 100%;
    background: rgba(7, 17, 27, 0.3);
  }
`;

export const Pla = styled.div`
  width: 100%;
  height: 0;
  padding-top: 75%;
`;

export const SingerButton = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: -40px;
  > div {
    display: flex;
    align-items: center;
    background-color: #d44439;
    padding: 10px 20px;
    border-radius: 15px;
    color: #ddd;
    span {
      padding-right: 10px;
    }
  }
`;

export const ScrollWrapper = styled.div`
  position: fixed;
  width: 100%;
  top: calc(75vw + 4px);
  z-index:1000;
  bottom: 0;
`;
