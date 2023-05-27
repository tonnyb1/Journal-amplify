import React from "react";
import styled from "styled-components";

const StyledFooter = styled.footer`
  background-color: #161616;
  color: #aaaaaa;
  height: 74px;
  display: flex;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;
  margin-top: auto;
  font-weight: 500;
`;

export default function Footer() {
  return (
    <StyledFooter>&#169; 2023 ANONYMOUS JOURNAL</StyledFooter>
  );
}
