import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Alert
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
`;

class DeckView extends Component {
  static navigationOptions = ({ navigation }) => {
    const { title } = navigation.state.params;
    return {
      title
    };
  };

  state = {
    shuffle: false,
    cards: [],
    original: []
  };

  componentDidMount() {
    const { cards: cardIds } = this.props.navigation.state.params;
    const { cardStore } = this.props;
    const cardsData = cardIds.map(cardId => cardStore[cardId]);
    // cards is an array of cardIds, we need to fetch these ids from the store
    this.setState({
      cards: cardsData,
      original: cardsData
    });
  }

  shuffleCards(cards) {
    return shuffle(cards, { copy: true });
  }

  toggleShuffle = () => {
    this.setState(({ shuffle, cards, original }) => ({
      shuffle: !shuffle,
      cards: !shuffle ? this.shuffleCards(cards) : original
    }));
  };

  onDeleteDeck = deckId => {
    this.props.dispatch(handleDeleteDeck(deckId));
    this.props.navigation.navigate("Home");
  };

  onEditDeck = deck => this.props.navigation.navigate("EditDeck", deck);

  onAddCard = () => this.props.navigation.navigate("AddCard");

  render() {
    const {
      title,
      deckId,
      cards: cardIds
    } = this.props.navigation.state.params;
    const { cards, shuffle } = this.state;
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
              onPress={() =>
                this.onEditDeck(this.props.navigation.state.params)
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
                  `Are you sure you want to delete the "${title}" deck?`,
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

        <SubheaderViewWrapper>
          <SubheaderText>Preview</SubheaderText>
        </SubheaderViewWrapper>

        <AddCardViewWrapper>
          {cards.length === 0 ? (
            <View>
              <Text>Looks like there are no cards in this deck!</Text>
              <TextButton marginTop={20} onPress={this.onAddCard}>
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
                onPress={this.onAddCard}>
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
        <View style={{ justifyContent: "center" }}>
          {cards.map(card => <Card key={card.cardId} {...card} />)}
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

export default connect(mapStateToProps)(DeckView);
