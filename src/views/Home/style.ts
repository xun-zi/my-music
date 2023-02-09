import styled from "styled-components";
import style from "@/assets/global-style"
export const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 10px;
  background-color: ${style["theme-color"]};

  span {
    line-height: 40px;
    color: #f1f1f1;
    font-size: 20px;
  }
  & .iconfont {
    font-size: 25px;
  }
`;

export const Tab = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 44px;
  background-color: ${style["theme-color"]};
  font-size: 14px;
  & a {
    flex: 1;
    text-align: center;
    color: #e4e4e4;
  }
  a.active span{
    padding: 3px 0;
    color:white;
    font-weight:700;
    border-bottom:solid 2px white;
  }
`;

export const Content = styled.div`
  position:fixed;
  top:94px;
  left:0;
  right:0;
  bottom:0;
`

export const TabItem = styled.div``;
