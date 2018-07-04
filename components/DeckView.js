import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView
} from "react-native";
import Deck from "./Deck";
import Button, { TextButton } from "./Button";
import { SubheaderText } from "./Styled";
import styled from "styled-components";
import { Ionicons } from "@expo/vector-icons";
import Card from "./Card";
import shuffle from "shuffle-array";

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

export default class DeckView extends Component {
  static navigationOptions = ({ navigation }) => {
    const { title } = navigation.state.params;
    return {
      title
    };
  };

  state = {
    shuffle: false,
    cards: []
  };

  componentDidMount() {
    const { cards } = this.props.navigation.state.params;
    this.setState({
      cards
    });
  }

  shuffleCards(cards) {
    return shuffle(cards, { copy: true });
  }

  toggleShuffle = () => {
    const { cards: originalCards } = this.props.navigation.state.params;
    this.setState(({ shuffle, cards }) => ({
      shuffle: !shuffle,
      cards: !shuffle ? this.shuffleCards(cards) : originalCards
    }));
  };

  render() {
    const { title, cards: originalCards } = this.props.navigation.state.params;
    const { cards } = this.state;
    const { shuffle } = this.state;
    return (
      <ScrollView>
        <Deck title={title} cards={cards}>
          <Button>Start Quiz!</Button>
        </Deck>

        <SubheaderViewWrapper>
          <SubheaderText>Preview</SubheaderText>
        </SubheaderViewWrapper>

        <AddCardViewWrapper>
          {cards.length === 0 ? (
            <View>
              <Text>Looks like there are no cards in this deck!</Text>
              <TextButton marginTop={20}>Add a card?</TextButton>{" "}
            </View>
          ) : (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                width
              }}>
              <Button color="transparent" padding={"10px"}>
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
