import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styled, { css } from "styled-components";

/*
    Example Usage:
        <Button color="black" tint="yellow">
            Text
        </Button>
*/

const TextButtonWrapper = styled.TouchableOpacity`
  ${props =>
    props.marginTop &&
    css`
      margin-top: ${props.marginTop};
    `} padding: 2px;
  align-items: center;
  justify-content: center;
`;

const ButtonWrapper = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  padding: ${props => (props.padding ? props.padding : `15px`)};
  background-color: ${props => (props.color ? props.color : "#57b9e3")};
  ${props =>
    props.allRound &&
    css`
      border-radius: 3px;
    `}
  ${props =>
    props.buttonStart &&
    css`
      border-top-left-radius: 3px;
      border-bottom-left-radius: 3px;
    `}
  ${props =>
    props.buttonEnd &&
    css`
      border-top-right-radius: 3px;
      border-bottom-right-radius: 3px;
    `}
  ${props =>
    props.height &&
    css`
      height: ${props.height};
    `};
`;

const ButtonText = styled.Text`
  color: ${props => (props.tint ? props.tint : "white")};
  ${props =>
    props.fontSize &&
    css`
      font-size: ${props.fontSize};
    `};
`;

export function TextButton({ children, ...rest }) {
  return (
    <TextButtonWrapper {...rest}>
      <ButtonText tint="black">{children}</ButtonText>
    </TextButtonWrapper>
  );
}

export default function Button({ children, tint, fontSize, ...rest }) {
  return (
    <ButtonWrapper {...rest}>
      <ButtonText fontSize={fontSize}>{children}</ButtonText>
    </ButtonWrapper>
  );
}
