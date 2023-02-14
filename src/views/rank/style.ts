import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

export const Title = styled.div`
  margin: 10px 5px;
  padding-top: 15px;
  font-weight: 700;
  font-size: 14px;
  color: #2e3030;
`;

export const Img = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .decorate {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 35px;
    border-radius: 3px;
    background: linear-gradient(hsla(0, 0%, 100%, 0), hsla(0, 0%, 43%, 0.4));
  }
  span {
    position: absolute;
    left: 7px;
    bottom: 7px;
    font-size: 10px;
    color: #f1f1f1;
  }
`;

export const OList = styled.div`
  margin-top: 10px;
  padding: 0 5px;
`;

export const OfficeListItem = styled.div`
  padding-bottom: 5px;
  display: flex;
  padding: 3px 0;
  border-bottom: 1px solid #e4e4e4;
  .imgWrapper {
    width: 27vw;
    height: 27vw;
  }
  .desc {
    flex: 1;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    font-size: 12px;
    color: grey;
  }
`;

export const GList = styled.div`
  box-sizing: border-box;
  margin-top: 10px;
  padding: 0 5px;
  display: flex;
  justify-content: space-between;
  flex-shrink: 0;
  flex-wrap: wrap;
  width: 100%;
`;

export const GlobalListItem = styled.div`
  position: relative;
  width: 32%;
  height: 32%;
  padding-bottom: 5px;
`;
