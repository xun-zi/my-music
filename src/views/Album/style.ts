import styled from "styled-components";
import style from "@/assets/global-style";
export const Desc = styled.div`
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 273px;

  display: flex;
  padding: 5px 15px;
  padding-top: 53px;

  .desc {
    box-sizing: border-box;
    height: 120px;
    padding: 5px 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .title {
      max-height: 70px;
      overflow: hidden;
      text-overflow: ellipsis;
      color: #f1f1f1;
      font-weight: 700;
      line-height: 1.5;
      font-size: 16px;
    }
    .user {
      display: flex;

      img {
        border-radius: 50%;
        width: 20px;
        height: 20px;
        padding-right: 10px;
      }
      span {
        line-height: 20px;
        font-size: 14px;
        color: #bba8a8;
      }
    }
  }
`;

export const Operation = styled.div`
  display: flex;
  padding: 0 10px 10px;
  margin-top: -70px;
  div {
    color: #f1f1f1;
    flex: 1;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    span {
      margin-bottom: 10px;
      font-size: 20px;
    }
  }
`;

export const List = styled.div`
  margin-top: 10px;
  background-color: white;
  font-size: 24px;
  .Top {
    position: relative;
    padding: 5px 8px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #e4e4e4;
    .icon-add {
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
  box-sizing:border-box;
  padding-right:10px;
  .idx {
    height: 60px;
    width: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .singer {
    padding: 10px 0;
    flex:1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .name {
      color: #2e3030;
      font-size: 17px;
      font-size: 550;
      text-overflow: ellipsis;
      overflow: hidden;
      ${
        style.aLineText
      }
    }
    .ly {
      font-size: 13px;
      color: #555;
      ${
        style.aLineText
      }
    }
  }
`;

export const Bg = styled.div<{
  url?: string;
}>`
  z-index: -1;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
  background-image: url(${(props) => props.url});
  filter: blur(20px);
  .filter {
    position: absolute;
    z-index: 10;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(7, 17, 27, 0.2);
  }
`;
