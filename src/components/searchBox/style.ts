import styled from "styled-components";

export const SearchWrapper = styled.div`
  background: #d44439;
  height: 40px;
  padding: 0 6px;
  padding-right: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .iconfont {
    font-size: 20px;
    color: white;
  }
  .input {
    flex: 1;
    background-color: rgba(0, 0, 0, 0);
    outline: none;
    border: 0;
    border-bottom: solid white 1px;
    margin: 0 5px;
    color: white;
    &::placeholder {
      color: white;
    }
  }
`;
