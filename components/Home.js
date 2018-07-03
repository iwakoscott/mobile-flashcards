import React from "react";
import styled from "styled-components";
import { Deck } from "./Deck";
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
          { key: "React", title: "React", cards: [] },
          { key: "Redux", title: "Redux", cards: [] },
          { key: "Mathmatics", title: "Mathematics", cards: [] }
        ]}
        renderItem={({ item }) => (
          <Deck
            {...item}
            onPress={() => props.navigation.navigate("DeckView", { ...item })}
          />
        )}
      />
    </HomeViewWrapper>
  );
}
