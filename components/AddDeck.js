import React, { Component } from "react";
import { Text, View, TextInput } from "react-native";
import styled from "styled-components";
import { connect } from "react-redux";
import { NewDeck } from "./Deck";
import { HeaderText, StyledTextInput } from "./Styled";
import Button from "./Button";
import { generateUID } from "../utils/api";
import { handleAddDeck } from "../actions/decks";

class AddDeck extends Component {
  state = {
    title: ""
  };

  nextView = deck => this.props.navigation.navigate("DeckView", deck);

  handleOnChangeText = text => this.setState({ title: text });
  buttonIsDisabled = () => this.state.title !== "";
  handleSubmit = () => {
    const deckId = generateUID();
    const { title } = this.state;

    const deck = {
      deckId,
      topScore: 0,
      title,
      timestamp: Date.now(),
      cards: []
    };
    // use API to add new Deck
    this.props.dispatch(handleAddDeck(deck));

    // go to DeckView
    this.nextView(deck);

    // reset title
    this.setState({ title: "" });
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "space-evenly",
          alignItems: "stretch"
        }}>
        <HeaderText centered>Add a Deck!</HeaderText>
        <NewDeck>
          <View
            style={{ flex: 1, justifyContent: "space-between", marginTop: 20 }}>
            <StyledTextInput
              onChangeText={this.handleOnChangeText}
              value={this.state.title}
              placeholder="Deck Title"
              maxLength={40}
            />
            <Button onPress={this.handleSubmit}>Add Deck</Button>
          </View>
        </NewDeck>
      </View>
    );
  }
}

export default connect()(AddDeck);
