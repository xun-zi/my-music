import styled from "styled-components";

export const Container = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #eee;
  display: grid;
  grid-template-rows: 40px 1fr;
  &.fly-enter,
  &.fly-appear {
    transform: translate3d(100%, 0, 0);
  }
  &.fly-enter-active,
  &.fly-appear-active {
    transition: all 0.3s;
    transform: translate3d(0, 0, 0);
  }
  &.fly-exit {
    transform: translate3d(0, 0, 0);
  }
  &.fly-exit-active {
    transition: all 0.3s;
    transform: translate3d(100%, 0, 0);
  }
`;

export const Content = styled.div`
  height: 100%;
  width: 100%;
`;

export const KeysWrapper = styled.div`
  .title {
    margin-top: 15px;
    margin-left: 20px;
    margin-bottom: 15px;
    color: #666;
  }

  .k-conatiner {
    display: flex;
    flex-wrap: wrap;
    .item {
      white-space: nowrap;
      font-size: 10px;
      padding: 10px;
      background-color: white;
      margin: 5px 5px;
      border-radius: 5px;
    }
  }
`;

export const SearchResult = styled.div`
  height: calc(100vh - 40px);
`;

export const SongItem = styled.div`
  border-bottom: 1px solid #e4e4e4;
  padding: 10px 15px;
  .info {
    div {
      font-size: 14px;
      margin-bottom: 10px;
    }
    span {
      font-size: 13px;
      color: #999;
    }
  }
`;
