import React, { Component } from "react";
import { Text, View, ActivityIndicator } from "react-native";
import { connect } from "react-redux";
import styled, { css } from "styled-components";
import Card from "./Card";
import { HeaderText } from "./Styled";
import Swiper from "react-native-deck-swiper";

const EndZone = styled.View`
  align-items: center;
  justify-content: center;
  border-style: dashed;
  border-width: 2px;
  border-color: #b2bec3;
  padding: 10px 20px;
  ${props =>
    props.color &&
    css`
      background-color: ${props.color};
    `};
  height: 75px;
`;

class Quiz extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: `Quiz: ${navigation.state.params.title}`
    };
  };

  state = {
    correct: 0,
    incorrect: 0
  };

  onSwipedLeft = () =>
    this.setState(({ incorrect }) => ({ incorrect: incorrect + 1 }));

  onSwipedRight = () =>
    this.setState(({ correct }) => ({ correct: correct + 1 }));

  onSwipedAll = () =>
    alert(
      `You answered ${this.state.correct} correct and ${
        this.state.incorrect
      } incorrect`
    );

  render() {
    const { deckId } = this.props.navigation.state.params;

    const { cards: cardIds } = this.props.deckStore[deckId];
    const cards = cardIds.map(cardId => this.props.cardStore[cardId]);
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          margin: 0
        }}>
        <Swiper
          verticalSwipe={false}
          onSwipedAll={this.onSwipedAll}
          onSwipedLeft={this.onSwipedLeft}
          onSwipedRight={this.onSwipedRight}
          cards={cards}
          renderCard={data => (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 100
              }}>
              <Card>
                {({ CardFront, CardBack, CardFlip }) => (
                  <CardFlip ref={card => (this["index" + data.index] = card)}>
                    <CardFront
                      question={data.question}
                      onPress={() => this["index" + data.index].flip()}
                    />
                    <CardBack
                      answer={data.answer}
                      onPress={() => this["index" + data.index].flip()}
                    />
                  </CardFlip>
                )}
              </Card>
            </View>
          )}
        />
      </View>
    );
  }
}

function mapStateToProps({ decks, cards }) {
  return {
    cardStore: cards.data,
    deckStore: decks.data
  };
}

export default connect(mapStateToProps)(Quiz);
