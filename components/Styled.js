import styled, { css } from "styled-components";
import { Text, View, TouchableOpacity, TextInput } from "react-native";

export const StyledTextInput = styled.TextInput`
  font-size: 30px;
  text-align: center;
  ${props =>
    props.backgroundColor &&
    css`
      background-color: ${props.backgroundColor};
    `};
  ${props =>
    props.borderColor &&
    css`
      border-color: ${props.borderColor};
      border-width: 2px;
      border-radius: 3px;
    `};
`;

export const HeaderText = styled.Text`
  font-size: ${props => (props.fontSize ? props.fontSize : "45px")};
  ${props =>
    props.centered &&
    css`
      text-align: center;
    `};
  ${props =>
    props.margin &&
    css`
      margin: ${props.margin}px;
    `};
`;

export const SubheaderText = styled.Text`
  font-size: 25px;
`;

export const MutedText = styled.Text`
  color: #57606f;
  ${props =>
    props.centered &&
    css`
      text-align: center;
    `};
`;
