import styled from "styled-components";
import { CSSTransition } from "react-transition-group";
import { useNavigate } from "react-router-dom";
import { forwardRef, ReactNode, useState } from "react";

const Container = styled.div`
  overflow:scroll;
  &::-webkit-scrollbar {
  display: none; /* Chrome Safari */
  }
  position: fixed;
  top: 0;
  left: 0;
  width:100vw;
  height:100vh;
  z-index: 1000;
  background: #fff;
  transform-origin: right bottom;
  &.fly-enter, &.fly-appear {
    transform: rotateZ(30deg) translate3d(100%, 0, 0);
  }
  &.fly-enter-active, &.fly-appear-active {
    transition: transform .3s;
    transform: rotateZ(0deg) translate3d(0, 0, 0);
  }
  &.fly-exit {
    transform: rotateZ(0deg) translate3d(0, 0, 0);
  }
  &.fly-exit-active {
    transition: transform .3s;
    transform: rotateZ(30deg) translate3d(100%, 0, 0);
  }
`;

type Props = {
  children?: ReactNode,
  showStatus: boolean
}

export default forwardRef(function (props: Props, myRef: React.ForwardedRef<HTMLDivElement>) {
  const { showStatus } = props;
  const navigage = useNavigate();
  return (
    <CSSTransition
      in={showStatus}
      timeout={300}
      classNames="fly"
      appear={true}
      unmountOnExit
      onExited={() => navigage(-1)}
    >
      <Container ref={myRef}>
        {
          props.children
        }
      </Container>
    </CSSTransition>
  );
})
