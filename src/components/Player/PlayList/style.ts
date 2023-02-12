import styled from "styled-components";

export const Wrapper = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 10004;
  &.enter {
    .songList {
      transform: translate3d(0, 100%, 0);
      transition: 0.4s;
    }
  }
  &.enter-active {
    .songList {
      transform: translate3d(0, 0%, 0);
    }
  }

  &.exit {
    .songList {
      transform: translate3d(0, 0%, 0);
      transition: 0.4s;
    }
  }

  &.exit-active {
    .songList {
      transform: translate3d(0, 100%, 0);
    }
  }
`;

export const GoodList = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: white;
  border-radius: 10px 10px 0 0;
  font-size: 14px;
  color: #2e3030;
  .playState {
    padding: 10px 20px;
    width: 100%;
    display: flex;
    align-items: center;
    .iconfont {
      margin-right: 10px;
      margin-top: 2px;
      font-size: 18px;
      color: #d44439;
    }
  }
  .list {
    height: 400px;
    overflow: scroll;
    ::-webkit-scrollbar {
      display: none; /* Chrome Safari */
    }
    list-style: none;
    font-size: 14px;
    color: #2e3030;
    .list-item {
      padding: 0 20px;
      display: flex;
      align-items: center;
      height: 40px;
      .name {
        flex: 1;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        font-size: 14px;
        color: #bba8a8;
      }
      .iconfont {
        flex: 0 0 20px;
        width: 20px;
        font-size: 12px;
        font-weight: 700;
        color: #d44439;
      }
    }
  }
`;
