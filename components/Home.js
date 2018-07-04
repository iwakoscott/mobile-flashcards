import React from "react";
import styled from "styled-components";
import { PressableDeck } from "./Deck";
import { Text, View, FlatList } from "react-native";
const HomeViewWrapper = styled.View`
  flex: 1;
  justify-content: center;
  margin-top: 10px;
`;

export default function Home(props) {
  return (
    <HomeViewWrapper>
      <FlatList
        data={[
          {
            key: "React",
            title: "React",
            cards: [
              {
                cardId: "jfsisfd893j3jnf",
                question: "What is a React Element?",
                answer:
                  "A React Element is a Object representation of a DOM node."
              },
              {
                cardId: "fdsjklfoweir3d",
                question: "What is a Component?",
                answer:
                  "A Component is a class or function that returns a React Element."
              },
              {
                cardId: "fdsjkasd3lfoweir3d",
                question: "Do you love React?",
                answer: "What kind of question is that? 😍"
              }
            ]
          },
          { key: "Redux", title: "Redux", cards: [] },
          { key: "Mathmatics", title: "Mathematics", cards: [] }
        ]}
        renderItem={({ item }) => (
          <PressableDeck
            {...item}
            onPress={() => props.navigation.navigate("DeckView", { ...item })}
          />
        )}
      />
    </HomeViewWrapper>
  );
}
