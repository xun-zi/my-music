import styled from "styled-components";
import style from "@/assets/global-style";
export const List = styled.div`
  margin-top: 10px;
  font-size: 24px;
  
  .Top {
    position: relative;
    padding: 5px 8px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #e4e4e4;
    .icon-add,
    .icon-Player {
      font-size: 24px;
      margin-right: 5px;
    }
    .prefix {
      font-size: 18px;
      padding-bottom: 2px;
      color: #333;
      margin-right: 5px;
    }
    .count {
      font-size: 10px;
      color: #888;
    }
    .collect {
      position: absolute;
      top: 0;
      right: 0;
      height: 100%;
      font-size: 17px;
      background-color: #d44439;
      color: #f1f1f1;
      display: flex;
      align-items: center;
      .Num {
        padding-right: 14px;
      }
    }
  }
`;

export const ListItem = styled.div`
  display: flex;
  box-sizing: border-box;
  padding-right: 10px;
  line-height: 1.5;
  .idx {
    height: 60px;
    width: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .singer {
    padding: 10px 0;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .name {
      color: #2e3030;
      font-size: 17px;
      font-size: 550;
      text-overflow: ellipsis;
      ${style.aLineText}
    }
    .ly {
      font-size: 11px;
      color: #999;
      ${style.aLineText}
    }
  }
`;
