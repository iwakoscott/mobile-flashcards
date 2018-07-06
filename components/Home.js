import React, { Component } from "react";
import styled, { css } from "styled-components";
import { PressableDeck } from "./Deck";
import { Text, View, FlatList, AsyncStorage } from "react-native";
import { connect } from "react-redux";
import { fetchAndHandleCards } from "../actions/cards";
import { fetchAndHandleDecks } from "../actions/decks";
import { TextButton } from "./Button";

const HomeViewWrapper = styled.View`
  flex: 1;
  justify-content: center;
  margin-top: 10px;
  ${props =>
    props.noCards &&
    css`
      align-items: center;
    `};
`;

class Home extends Component {
  state = {
    data: []
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchAndHandleCards());
    dispatch(fetchAndHandleDecks());
  }

  componentDidUpdate(prevProps) {
    if (prevProps.data !== this.props.data) {
      this.setState({
        data: this.props.data
      });
    }
  }

  render() {
    const noCards = this.state.data.length === 0;
    return (
      <HomeViewWrapper noCards={noCards}>
        {noCards ? (
          <View>
            <Text>Looks like you don't have any decks.</Text>
            <TextButton
              onPress={() => this.props.navigation.navigate("Add Deck")}>
              Add a Deck?
            </TextButton>
          </View>
        ) : (
          <FlatList
            data={this.state.data}
            keyExtractor={({ deckId }) => deckId}
            renderItem={({ item }) => (
              <PressableDeck
                {...item}
                onPress={() =>
                  this.props.navigation.navigate("DeckView", {
                    title: item.title,
                    deckId: item.deckId
                  })
                }
              />
            )}
          />
        )}
      </HomeViewWrapper>
    );
  }
}

function mapStateToProps({ decks }) {
  return {
    data: Object.values(decks.data).sort((a, b) => b.timestamp - a.timestamp)
  };
}

export default connect(mapStateToProps)(Home);
