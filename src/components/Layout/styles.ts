import styled from "styled-components";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
`;

export const OpenNavigationButton = styled.div`
  position: absolute;
  left: 16px;
  top: 16px;
  z-index: 1;
  width: 48px;
  height: 48px;
  cursor: pointer;
`;

export const Content = styled.div`
  width: 100%;
  height: 100%;
  position: relative;

  & > div {
    width: 100%;
    height: 100%;
    position: relative;
  }
`;
