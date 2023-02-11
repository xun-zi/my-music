import styled from "styled-components";

export const Wrapper = styled.div<{
    
}>`
  width: calc(64vw + 70px);
  margin: auto;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  .progressWrapper {
    flex: 1;
    background-color: #333;
    height: 3px;
    width: 100%;
    margin: 0 15px;
    display:flex;
    align-items:center;
    position:relative;
    .progressBar {
      background-color: #d44439;
      height: 100%;
      width:0px;
    }
    .btn {
      position:absolute;
      left:-9.5px;
      box-sizing: border-box;
      width: 16px;
      height: 16px;
      border: 3px solid #e4e4e4;
      border-radius: 50%;
      background: #d44439;
    }
  }
`;
