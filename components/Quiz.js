import React, { Component } from "react";
import { View, Modal, Dimensions } from "react-native";
import { connect } from "react-redux";
import Card from "./Card";
import { HeaderText, SubheaderText } from "./Styled";
import Button from "./Button";
import Swiper from "react-native-deck-swiper";
import { grader } from "../utils/tools";

const { width } = Dimensions.get("window");

class Quiz extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: `Quiz: ${navigation.state.params.title}`
    };
  };

  state = {
    correct: 0,
    incorrect: 0,
    numberOfQuestions: 0,
    modalOpen: false
  };

  componentDidMount() {
    const { deckId } = this.props.navigation.state.params;
    const { cards } = this.props.deckStore[deckId];
    this.setState({
      numberOfQuestions: cards.length
    });
  }

  onSwipedLeft = () =>
    this.setState(({ incorrect }) => ({
      incorrect: incorrect + 1
    }));

  onSwipedRight = () =>
    this.setState(({ correct }) => ({
      correct: correct + 1
    }));

  onSwipedAll = () => {
    this.setState(({ modalOpen }) => ({
      modalOpen: !modalOpen
    }));
  };

  onResetQuiz = () => {
    const { deckId, title } = this.props.navigation.state.params;

    // reset card flips if they have been flipped;

    this.setState(({ modalOpen }) => ({
      modalOpen: !modalOpen,
      correct: 0,
      incorrect: 0
    }));
    this.props.navigation.replace("Quiz", { deckId, title });
  };

  render() {
    const { deckId } = this.props.navigation.state.params;

    const { cards: cardIds } = this.props.deckStore[deckId];
    const cards = cardIds.map(cardId => this.props.cardStore[cardId]);
    const { correct, numberOfQuestions } = this.state;
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          margin: 0,
          width
        }}>
        <Swiper
          verticalSwipe={false}
          swipeAnimationDuration={100}
          onSwipedAll={this.onSwipedAll}
          onSwipedLeft={this.onSwipedLeft}
          onSwipedRight={this.onSwipedRight}
          cards={cards}
          stackSize={cards.length}
          keyExtractor={({ cardId }) => cardId}
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
                  <CardFlip ref={card => (this["index" + data.cardId] = card)}>
                    <CardFront
                      question={data.question}
                      onPress={() => this["index" + data.cardId].flip()}
                    />
                    <CardBack
                      answer={data.answer}
                      onPress={() => this["index" + data.cardId].flip()}
                    />
                  </CardFlip>
                )}
              </Card>
            </View>
          )}
        />
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalOpen}>
          <View
            style={{
              flex: 1,
              justifyContent: "space-around",
              alignItems: "center",
              backgroundColor: "#4FD0E9"
            }}>
            <HeaderText centered fontSize="35px" color="white" margin="5">
              Quiz Complete!✨
            </HeaderText>

            <SubheaderText centered color="white" margin="4">
              Your score: {`${correct}/${numberOfQuestions}`}
            </SubheaderText>

            <HeaderText centered fontSize="25px" color="white" margin="5">
              {grader(correct, numberOfQuestions)}
            </HeaderText>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-evenly",
                width
              }}>
              <Button allRound onPress={this.onResetQuiz} fontSize="20px">
                Reset Quiz
              </Button>
              <Button fontSize="20px" allRound color="#f1c40f">
                Home
              </Button>
            </View>
          </View>
        </Modal>
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
