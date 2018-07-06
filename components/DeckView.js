import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Alert,
  ActivityIndicator
} from "react-native";
import Deck from "./Deck";
import Button, { TextButton } from "./Button";
import { SubheaderText } from "./Styled";
import styled from "styled-components";
import { Ionicons, Entypo } from "@expo/vector-icons";
import Card from "./Card";
import shuffle from "shuffle-array";
import { connect } from "react-redux";
import { handleDeleteDeck } from "../actions/decks";

const { width, height } = Dimensions.get("window");

const SubheaderViewWrapper = styled.View`
  padding-top: 25px;
  padding-bottom: 15px;
  justify-content: center;
  align-items: center;
`;

const AddCardViewWrapper = styled.View`
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

class DeckView extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Deck"
    };
  };

  state = {
    shuffle: false
  };

  shouldComponentUpdate(nextProps, nextState) {
    const { deckId } = this.props.navigation.state.params;
    return typeof nextProps.deckStore[deckId] !== "undefined";
  }

  shuffleCards(cards) {
    return shuffle(cards, { copy: true });
  }

  toggleShuffle = () => {
    this.setState(({ shuffle }) => ({ shuffle: !shuffle }));
  };

  onDeleteDeck = deckId => {
    this.props.dispatch(handleDeleteDeck(deckId));
    this.props.navigation.navigate("Home");
  };

  onEditDeck = deck => this.props.navigation.navigate("EditDeck", deck);

  onAddCard = deckId => this.props.navigation.navigate("AddCard", { deckId });

  render() {
    const { deckId } = this.props.navigation.state.params;
    if (typeof this.props.deckStore[deckId] === "undefined") {
      return <ActivityIndicator />;
    }
    const { title, cards: cardIds } = this.props.deckStore[deckId];
    const cards = cardIds.map(cardId => this.props.cardStore[cardId]);
    const { shuffle } = this.state;
    const cardsToDisplay = shuffle ? this.shuffleCards(cards) : cards;
    return (
      <ScrollView>
        <Deck title={title} cards={cards}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center"
            }}>
            <Button height="50px" fontSize="20px" buttonStart>
              Start Quiz!
            </Button>
            <Button
              height="50px"
              color="#F79F1F"
              onPress={
                () => this.onEditDeck({ deckId, title }) // {deckId, title}
              }>
              <Entypo name="edit" size={20} color="white" />
            </Button>
            <Button
              height="50px"
              color="#EA2027"
              buttonEnd
              onPress={() =>
                Alert.alert(
                  `Wait! 👋 `,
                  `Are you sure you want to delete the "${title}" deck? You can't undo this action.`,
                  [
                    {
                      text: "OK",
                      onPress: () => this.onDeleteDeck(deckId)
                    },
                    { text: "Cancel", style: "cancel" }
                  ]
                )
              }>
              <Entypo name="trash" size={20} color="white" />
            </Button>
          </View>
        </Deck>

        <AddCardViewWrapper>
          {cards.length === 0 ? (
            <View
              style={{
                marginTop: 30
              }}>
              <Text>Looks like there are no cards in this deck!</Text>
              <TextButton marginTop={20} onPress={() => this.onAddCard(deckId)}>
                Add a card?
              </TextButton>{" "}
            </View>
          ) : (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                width
              }}>
              <Button
                color="transparent"
                padding={"10px"}
                onPress={() => this.onAddCard(deckId)}>
                <Ionicons name="ios-add" size={50} color="black" />
              </Button>
              <Button
                color="transparent"
                padding={"10px"}
                onPress={this.toggleShuffle}>
                <Ionicons
                  name="ios-shuffle"
                  size={50}
                  color={shuffle ? "#34e7e4" : "black"}
                />
              </Button>
            </View>
          )}
        </AddCardViewWrapper>

        {cards.length === 0 ? null : (
          <SubheaderViewWrapper>
            <SubheaderText>Preview</SubheaderText>
          </SubheaderViewWrapper>
        )}

        <View style={{ justifyContent: "center" }}>
          {cardsToDisplay.map((card, index) => (
            <Card key={index} card={card}>
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

export default connect(mapStateToProps)(DeckView);
