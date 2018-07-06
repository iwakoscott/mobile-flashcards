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
    const { title } = navigation.state.params;
    return {
      title: `✏️ Edit ${title}`
    };
  };

  state = {
    title: "",
    cards: []
  };

  componentDidMount() {
    const { title, cards } = this.props.navigation.state.params;
    this.setState({
      title,
      cards: cards.map(cardId => this.props.cardStore[cardId])
    });
  }

  nextView = deck => this.props.navigation.navigate("DeckView", deck);

  handleOnChangeText = text => this.setState({ title: text });

  handleSubmit = () => {
    const { title: newTitle } = this.state;
    const trimmedTitle = newTitle.trim();

    if (trimmedTitle === "") {
      Alert.alert(`Oops! ✋`, `Please give your deck a unique title! 🦄`);
    } else {
      const deck = {
        ...this.props.navigation.state.params,
        title: trimmedTitle
      };

      // use API to update Deck
      this.props.dispatch(handleUpdateDeck(deck));

      // go to DeckView
      // this.nextView(deck);

      // reset title
      // this.setState({ title: "" });
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
                      question={card.question}
                      onPress={() => this["card" + index].flip()}
                    />
                    <CardBack
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

function mapStateToProps({ cards }) {
  return {
    cardStore: cards.data
  };
}

export default connect(mapStateToProps)(EditDeck);
