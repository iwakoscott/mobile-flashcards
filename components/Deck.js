import React from "react";
import { Text, View, Dimensions, TouchableOpacity } from "react-native";
import styled, { css } from "styled-components";

const { width, height } = Dimensions.get("window");
import { HeaderText, MutedText } from "./Styled";

const DeckViewWrapper = styled.View`
  background-color: white;
  border-radius: 20;
  padding: 20px;
  margin: 17px 10px 0px 10px;
  shadow-radius: 3px;
  shadow-opacity: 1;
  shadow-color: rgba(0, 0, 0, 0.43);
  shadow-offset: 0px 10px;
  min-height: 250px;
  ${props =>
    props.width &&
    css`
      width: ${props.width};
    `};
`;

const DeckBodyViewWrapper = styled.View`
  justify-content: center;
  flex: 1;
`;

const DeckButtonsViewWrapper = styled.View`
  flex: 1;
  justify-content: center;
`;

export function PressableDeck({ title, cards, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Deck title={title} cards={cards} />
    </TouchableOpacity>
  );
}

export function NewDeck({ children, width }) {
  return <DeckViewWrapper width={width}>{children}</DeckViewWrapper>;
}

export default function Deck({ title, cards, children }) {
  const numberOfCards = cards.length;
  return (
    <DeckViewWrapper>
      <HeaderText centered>{title}</HeaderText>
      <DeckBodyViewWrapper>
        <MutedText centered>{numberOfCards} Cards</MutedText>
      </DeckBodyViewWrapper>
      {typeof children !== "undefined" && (
        <DeckButtonsViewWrapper>{children}</DeckButtonsViewWrapper>
      )}
    </DeckViewWrapper>
  );
}
