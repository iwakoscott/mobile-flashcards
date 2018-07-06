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
import { handleDeleteCard } from "../actions/cards";
import Card from "./Card";
import { Ionicons } from "@expo/vector-icons";

class EditDeck extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: `Edit Mode 👷‍♂️`
    };
  };

  state = {
    title: ""
  };

  componentDidMount() {
    this.setState({ title: this.props.navigation.state.params.title });
  }

  nextView = deck => this.props.navigation.navigate("DeckView");

  handleOnChangeText = text => this.setState({ title: text });

  onDeleteCard = (cardId, deckId) => {
    Alert.alert(
      `Wait! ✋`,
      `Are you sure you want to delete this card? You cannot undo this action.`,
      [
        {
          text: `Yes, delete this card.`,
          onPress: () => {
            debugger;
            this.props.dispatch(handleDeleteCard(cardId, deckId));
          }
        },
        { text: "Cancel", style: "cancel" }
      ]
    );
  };

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

  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.cardStore !== this.props.cardStore ||
      this.state.title !== nextState.title
    );
  }

  render() {
    const { cardStore, deckStore } = this.props;
    const { deckId } = this.props.navigation.state.params;
    const { cards } = deckStore[deckId];
    const cardData = cards.map(cardId => cardStore[cardId]);

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
            {cardData.map((card, index) => (
              <Card card={card} key={index}>
                {({ CardFront, CardBack, CardFlip }) => (
                  <CardFlip ref={card => (this["card" + index] = card)}>
                    <CardFront
                      editable
                      question={card.question}
                      onPress={() => this["card" + index].flip()}
                      onDelete={() => this.onDeleteCard(card.cardId, deckId)}
                    />
                    <CardBack
                      editable
                      answer={card.answer}
                      onPress={() => this["card" + index].flip()}
                      onDelete={() => this.onDeleteCard(card.cardId, deckId)}
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
