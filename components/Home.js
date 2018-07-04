import React, { Component } from "react";
import styled from "styled-components";
import { PressableDeck } from "./Deck";
import { Text, View, FlatList, AsyncStorage } from "react-native";
import { connect } from "react-redux";
import { fetchAndHandleCards } from "../actions/cards";
import { fetchAndHandleDecks } from "../actions/decks";

const HomeViewWrapper = styled.View`
  flex: 1;
  justify-content: center;
  margin-top: 10px;
`;

class Home extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchAndHandleCards());
    dispatch(fetchAndHandleDecks());
  }

  render() {
    return (
      <HomeViewWrapper>
        <FlatList
          data={this.props.data}
          keyExtractor={({ deckId }) => deckId}
          renderItem={({ item }) => (
            <PressableDeck
              {...item}
              onPress={() =>
                this.props.navigation.navigate("DeckView", { ...item })
              }
            />
          )}
        />
      </HomeViewWrapper>
    );
  }
}

function mapStateToProps({ decks }) {
  return {
    data: Object.values(decks.data)
  };
}

export default connect(mapStateToProps)(Home);
