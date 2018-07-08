import React, { Component } from "react";
import { StyledTextInput } from "./Styled";
import { View, Text, Alert, KeyboardAvoidingView } from "react-native";
import { connect } from "react-redux";
import Card from "./Card";
import Button from "./Button";
import { generateUID } from "../utils/api";
import { handleAddCard } from "../actions/cards";

class AddCard extends Component {
  static navigationOptions = () => {
    return {
      title: `Add a New Card`
    };
  };

  state = {
    question: "",
    answer: ""
  };

  onSubmit = () => {
    // check to see if question and answers are trimmed and not empty
    const { question, answer } = this.state;
    const questionTrimmed = question.trim();
    const answerTrimmed = answer.trim();
    const { dispatch, navigation, decks } = this.props;

    if (questionTrimmed === "" || answerTrimmed === "") {
      if (questionTrimmed === "" && answerTrimmed === "") {
        Alert.alert(
          `Oops! ✋`,
          `Please give your card both a question and an answer! ✨`
        );
      } else if (questionTrimmed === "") {
        Alert.alert(`Oops! ✋`, `Please give your card a question! ❓`);
      } else {
        Alert.alert(
          `Oops! ✋`,
          `Looks like your card doesn't have an answer, flip the card and add one! 🤓`
        );
      }
    } else {
      const card = {
        cardId: generateUID(),
        question: questionTrimmed,
        answer: answerTrimmed,
        timestamp: Date.now()
      };

      const { deckId } = navigation.state.params;

      dispatch(handleAddCard(card, deckId));
      navigation.navigate("DeckView", { deckId });
    }
  };

  handleOnChangeText = (text, type) =>
    this.setState({
      [type]: text
    });

  render() {
    const { question, answer } = this.state;
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "space-evenly",
          alignItems: "center"
        }}>
        <KeyboardAvoidingView behavior="padding" enabled>
          <Card>
            {({ CardFlip, CardFront, CardBack }) => (
              <CardFlip ref={card => (this.card = card)}>
                <CardFront onPress={() => this.card.flip()}>
                  <View>
                    <StyledTextInput
                      allowFontScaling
                      maxLength={100}
                      value={question}
                      onChangeText={text =>
                        this.handleOnChangeText(text, "question")
                      }
                      placeholder="Add a question"
                    />
                  </View>
                </CardFront>
                <CardBack onPress={() => this.card.flip()}>
                  <View>
                    <StyledTextInput
                      allowFontScaling
                      maxLength={100}
                      value={answer}
                      onChangeText={text =>
                        this.handleOnChangeText(text, "answer")
                      }
                      placeholder="Add an answer"
                    />
                  </View>
                </CardBack>
              </CardFlip>
            )}
          </Card>
        </KeyboardAvoidingView>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center"
          }}>
          <Button fontSize={20} onPress={this.onSubmit} allRound>
            Add to Deck
          </Button>
        </View>
      </View>
    );
  }
}

export default connect(({ decks }) => ({ decks }))(AddCard);
