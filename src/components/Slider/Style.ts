import styled from "styled-components";
import style from "@/assets/global-style";

export const SliderContainer = styled.div`
  --swiper-theme-color: ${style["theme-color"]};
  position: relative;
  .slider-slider {
    box-sizing: border-box;
    padding: 0 3px;
    border-radius: 7px;
    width: 100%;
    img {
      width: 100%;
    }
  }
  .before {
    position: absolute;
    width: 100%;
    height: 200%;
    z-index:-1;
    background-color: ${style["theme-color"]};
    left:0;
    top:-150%;
  }
`;
