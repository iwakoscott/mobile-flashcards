import styled, { css } from "styled-components";

export const HeaderText = styled.Text`
  font-size: 40px;
  ${props =>
    props.centered &&
    css`
      text-align: center;
    `};
`;

export const SubheaderText = styled.Text`
  font-size: 25px;
  color: #e84118;
`;

export const MutedText = styled.Text`
  color: #57606f;
  ${props =>
    props.centered &&
    css`
      text-align: center;
    `};
`;
