import styled from "styled-components";

export const List = styled.div`
  padding: 10px;
  display: flex;
  flex-shrink: 1;
  justify-content: space-between;
  flex-wrap: wrap;
`;

export const ListItem = styled.div<{
    width?:number|string
}>`
  width: ${props => props.width};
  flex-shrink:0;
  .desc {
    overflow: hidden;
    margin-top: 2px;
    padding: 0 2px;
    height: 50px;
    text-align: left;
    font-size: 12px;
    line-height: 1.4;
    color: #2e3030;
  }
  .imgWrapper {
    position: relative;
    width: 100%;
    height: 0;
    padding-bottom: 100%;
    img {
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: 3px;
    }
    .playCount {
      padding-top: 3px;
      padding-right: 3px;
      position: absolute;
      top: 0;
      right: 0;
      z-index: 100;
      color: #f1f1f1;
      font-size: 12px;

      .iconfont {
        padding-top: 3px;
        font-size: 10px;
      }
    }
    .decorate {
      z-index: 1;
      position: absolute;
      top: 0;
      width: 100%;
      height: 35px;
      border-radius: 3px;
      background: linear-gradient(hsla(0, 0%, 43%, 0.4), hsla(0, 0%, 100%, 0));
    }
  }
`;
