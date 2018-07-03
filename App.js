import React from "react";
import { Text, View, Dimensions } from "react-native";
import styled, { css } from "styled-components";

const { width, height } = Dimensions.get("window");

const HomeViewWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const HeaderText = styled.Text`
  font-size: 40px;
  ${props =>
    props.centered &&
    css`
      text-align: center;
    `};
`;

const SubheaderText = styled.Text`
  font-size: 25px;
  color: #e84118;
`;

const MutedText = styled.Text`
  color: #a4b0be;
  ${props =>
    props.centered &&
    css`
      text-align: center;
    `};
  ${props =>
    props.margin &&
    css`
      margin: ${props.margin};
    `};
`;

const DeckViewWrapper = styled.View`
  background-color: white;
  border-radius: 3;
  padding: 20px;
  margin: 17px 10px 0px 10px;
  shadow-radius: 3px;
  shadow-opacity: 0.8;
  shadow-color: rgba(0, 0, 0, 0.43);
  shadow-offset: 0px 10px;
  min-height: 175px;
`;

const DecksViewWrapper = styled.View`
  width: ${width};
`;

export default class App extends React.Component {
  render() {
    return (
      <HomeViewWrapper>
        <DecksViewWrapper>
          <DeckViewWrapper>
            <HeaderText centered>React</HeaderText>
            <MutedText centered margin="20px">
              0 Cards
            </MutedText>
          </DeckViewWrapper>
        </DecksViewWrapper>
      </HomeViewWrapper>
    );
  }
}
