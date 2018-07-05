import React, { Component } from "react";
import {
  Text,
  View,
  TextInput,
  Alert,
  KeyboardAvoidingView
} from "react-native";
import styled from "styled-components";
import { connect } from "react-redux";
import { NewDeck } from "./Deck";
import { HeaderText, StyledTextInput } from "./Styled";
import Button from "./Button";
import { generateUID } from "../utils/api";
import { handleUpdateDeck } from "../actions/decks";

class EditDeck extends Component {
  state = {
    title: ""
  };

  componentDidMount() {
    const { title } = this.props.navigation.state.params;
    this.setState({ title });
  }

  nextView = deck => this.props.navigation.navigate("DeckView", deck);

  handleOnChangeText = text => this.setState({ title: text });

  handleSubmit = () => {
    const { title: newTitle } = this.state;

    if (newTitle === "") {
      Alert.alert(`Oops! ✋`, `Please give your deck a unique title! 🦄`);
    } else {
      const deck = {
        ...this.props.navigation.state.params,
        title: newTitle
      };
      // use API to update Deck
      this.props.dispatch(handleUpdateDeck(deck));
      // go to DeckView
      this.nextView(deck);

      // reset title
      this.setState({ title: "" });
    }
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "space-evenly",
          alignItems: "stretch"
        }}>
        <HeaderText centered>Edit Deck!</HeaderText>
        <KeyboardAvoidingView behavior="padding" enabled>
          <NewDeck>
            <View
              style={{
                flex: 1,
                justifyContent: "space-between",
                marginTop: 20
              }}>
              <StyledTextInput
                onChangeText={this.handleOnChangeText}
                value={this.state.title}
                placeholder="Deck Title"
                maxLength={40}
              />
              <Button onPress={this.handleSubmit}>Edit Deck</Button>
            </View>
          </NewDeck>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

export default connect()(EditDeck);
