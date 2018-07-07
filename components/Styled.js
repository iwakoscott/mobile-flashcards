import styled, { css } from "styled-components";
import { Text, View, TouchableOpacity, TextInput } from "react-native";

export const StyledTextInput = styled.TextInput`
  width: 100%;
  font-size: 30px;
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
      border-style: dashed;
      shadow-radius: 10px;
      shadow-opacity: 0.4;
      shadow-color: rgba(0, 0, 0, 0.43);
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
