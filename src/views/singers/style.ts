import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const List = styled.div`
  position: fixed;
  top: 164px;
  left: 0px;
  bottom: 0;
  width: 100%;
  flex: 1;
`;

export const ListItem = styled.div`
  margin: 0 5px;
  padding: 5px 0;
  border-bottom: 2px solid #999;
  display: flex;
  align-items: center;
  img {
    width: 50px;
    height: 50px;
    margin-right: 15px;
    border-radius: 5px;
  }
  .name {
    color: #666;
  }
`;

export const PullDown = styled.div`
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  right: 0;
  margin: auto;
  .react-loader-wrap .ball-scale-multiple > div {
    background-color: #d44439;
  }
`;
export const PullUp = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  .react-loader-wrap .ball-pulse > div {
    background-color: #d44439;
  }
`;
