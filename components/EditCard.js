import React, { Component } from "react";
import { StyledTextInput } from "./Styled";
import { View, Text, Alert } from "react-native";
import { connect } from "react-redux";
import Card from "./Card";
import Button from "./Button";
import { generateUID } from "../utils/api";
import { handleAddCard, handleUpdateCard } from "../actions/cards";

class EditCard extends Component {
  static navigationOptions = () => {
    return {
      title: `Edit Mode 🔧`
    };
  };

  state = {
    question: "",
    answer: ""
  };

  componentDidMount() {
    // When component mounts, we want to update the question, answer states which can be passed from prev route
    const { card } = this.props.navigation.state.params;
    const { question, answer } = card;
    this.setState({ question, answer });
  }

  onSubmit = () => {
    // check to see if question and answers are trimmed and not empty
    const { question, answer } = this.state;
    const { card } = this.props.navigation.state.params;
    const questionTrimmed = question.trim();
    const answerTrimmed = answer.trim();
    const { dispatch, navigation } = this.props;

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
      const updatedCard = {
        ...card,
        question: questionTrimmed,
        answer: answerTrimmed
      };

      const { deckId } = navigation.state.params;

      dispatch(handleUpdateCard(updatedCard));

      navigation.goBack();
    }
  };

  handleOnChangeText = (text, type) =>
    this.setState({
      [type]: text
    });

  render() {
    const { question, answer } = this.state;
    const { defaults } = this.props.navigation.state.params;
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "space-evenly",
          alignItems: "center"
        }}>
        <Card>
          {({ CardFlip, CardFront, CardBack }) => {
            return (
              <CardFlip ref={card => (this.card = card)}>
                {defaults === "DEFAULT_FRONT" ? (
                  <CardFront onPress={() => this.card.flip()} onEditCardView>
                    <View>
                      <StyledTextInput
                        backgroundColor="white"
                        borderColor="#f1f2f6"
                        maxLength={100}
                        value={question}
                        onChangeText={text =>
                          this.handleOnChangeText(text, "question")
                        }
                        placeholder="Add a question"
                      />
                    </View>
                  </CardFront>
                ) : (
                  <CardBack onPress={() => this.card.flip()} onEditCardView>
                    <View>
                      <StyledTextInput
                        backgroundColor="white"
                        borderColor="#f1f2f6"
                        maxLength={100}
                        value={answer}
                        onChangeText={text =>
                          this.handleOnChangeText(text, "answer")
                        }
                        placeholder="Add an answer"
                      />
                    </View>
                  </CardBack>
                )}

                {defaults !== "DEFAULT_FRONT" ? (
                  <CardFront onPress={() => this.card.flip()} onEditCardView>
                    <View>
                      <StyledTextInput
                        backgroundColor="white"
                        borderColor="#f1f2f6"
                        maxLength={100}
                        value={question}
                        onChangeText={text =>
                          this.handleOnChangeText(text, "question")
                        }
                        placeholder="Add a question"
                      />
                    </View>
                  </CardFront>
                ) : (
                  <CardBack onPress={() => this.card.flip()} onEditCardView>
                    <View>
                      <StyledTextInput
                        backgroundColor="white"
                        borderColor="#f1f2f6"
                        maxLength={100}
                        value={answer}
                        onChangeText={text =>
                          this.handleOnChangeText(text, "answer")
                        }
                        placeholder="Add an answer"
                      />
                    </View>
                  </CardBack>
                )}
              </CardFlip>
            );
          }}
        </Card>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center"
          }}>
          <Button
            color="#f1c40f"
            fontSize={20}
            onPress={this.onSubmit}
            allRound>
            Save Changes
          </Button>
        </View>
      </View>
    );
  }
}

export default connect()(EditCard);
