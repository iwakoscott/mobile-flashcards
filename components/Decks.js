import React from "react";
import { Text, View, Dimensions, TouchableOpacity } from "react-native";
import styled from "styled-components";

const { width, height } = Dimensions.get("window");
import { HeaderText, MutedText } from "./Styled";

const DeckViewWrapper = styled.View`
  background-color: #f7f1e3;
  border-radius: 4;
  padding: 20px;
  margin: 17px 10px 0px 10px;
  shadow-radius: 3px;
  shadow-opacity: 1;
  shadow-color: rgba(0, 0, 0, 0.43);
  shadow-offset: 0px 10px;
  min-height: 175px;
`;

const DeckBodyViewWrapper = styled.View`
  justify-content: center;
  flex: 1;
`;

export function Deck({ title, cards }) {
  const numberOfCards = cards.length;
  return (
    <TouchableOpacity onPress={() => alert(`${title} clicked!`)}>
      <DeckViewWrapper>
        <HeaderText centered>{title}</HeaderText>
        <DeckBodyViewWrapper>
          <MutedText centered>{numberOfCards} Cards</MutedText>
        </DeckBodyViewWrapper>
      </DeckViewWrapper>
    </TouchableOpacity>
  );
}
