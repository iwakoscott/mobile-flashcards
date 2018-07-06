import React, { Component } from "react";
import {
  Text,
  View,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  ScrollView
} from "react-native";
import styled from "styled-components";
import { connect } from "react-redux";
import { NewDeck } from "./Deck";
import { HeaderText, StyledTextInput } from "./Styled";
import Button from "./Button";
import { handleUpdateDeck } from "../actions/decks";
import Card from "./Card";
import { Ionicons } from "@expo/vector-icons";

class EditDeck extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: `✏️ Edit Deck`
    };
  };

  state = {
    title: "",
    cards: []
  };

  componentDidMount() {
    const { title, deckId } = this.props.navigation.state.params;
    const { cardStore, deckStore } = this.props;
    const deck = deckStore[deckId];
    const { cards: cardIds } = deck;
    this.setState({
      title,
      cards: cardIds.map(cardId => cardStore[cardId])
    });
  }

  nextView = deck => this.props.navigation.navigate("DeckView");

  handleOnChangeText = text => this.setState({ title: text });

  handleSubmit = () => {
    const { title: newTitle } = this.state;
    const trimmedTitle = newTitle.trim();

    if (trimmedTitle === "") {
      Alert.alert(`Oops! ✋`, `Please give your deck a unique title! 🦄`);
    } else {
      const { deckId } = this.props.navigation.state.params;
      const deck = {
        ...this.props.deckStore[deckId],
        title: trimmedTitle
      };

      // use API to update Deck
      this.props.dispatch(handleUpdateDeck(deck));
      Alert.alert(
        `Your changes have been saved! ✅`,
        `Your deck's new title is "${trimmedTitle}"`,
        [
          {
            text: `Done with your edits?`,
            onPress: () => this.props.navigation.navigate("DeckView")
          },
          { text: "Cancel", style: "cancel" }
        ]
      );
    }
  };

  render() {
    const { cards } = this.state;
    return (
      <ScrollView>
        <View
          style={{
            flex: 1,
            alignItems: "stretch"
          }}>
          <KeyboardAvoidingView behavior="padding" enabled>
            <NewDeck>
              <View
                style={{
                  flex: 1,
                  justifyContent: "space-between",
                  marginTop: 20
                }}>
                <StyledTextInput
                  backgroundColor="white"
                  borderColor="#f1f2f6"
                  allowFontScaling
                  onChangeText={this.handleOnChangeText}
                  value={this.state.title}
                  placeholder="Deck Title"
                  maxLength={40}
                />
              </View>
              <Button
                onPress={this.handleSubmit}
                color="#F79F1F"
                fontSize={20}
                allRound>
                Edit Title{" "}
              </Button>
            </NewDeck>
          </KeyboardAvoidingView>

          <View style={{ justifyContent: "center" }}>
            {cards.map((card, index) => (
              <Card card={card} key={index}>
                {({ CardFront, CardBack, CardFlip }) => (
                  <CardFlip ref={card => (this["card" + index] = card)}>
                    <CardFront
                      editable
                      question={card.question}
                      onPress={() => this["card" + index].flip()}
                    />
                    <CardBack
                      editable
                      answer={card.answer}
                      onPress={() => this["card" + index].flip()}
                    />
                  </CardFlip>
                )}
              </Card>
            ))}
          </View>
        </View>
      </ScrollView>
    );
  }
}

function mapStateToProps({ cards, decks }) {
  return {
    cardStore: cards.data,
    deckStore: decks.data
  };
}

export default connect(mapStateToProps)(EditDeck);
