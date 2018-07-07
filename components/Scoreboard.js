import React, { Component } from "react";
import { HeaderText } from "./Styled";
import { View, Text } from "react-native";

export default class Scoreboard extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: `Quiz: ${navigation.state.params.title}`
    };
  };

  render() {
    const { correct, incorrect, numberOfQuestions } = navigation.state.params;
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "space-between",
          alignItems: "center"
        }}>
        <HeaderText>Your Score: {`${correct}/${numberOfQuestions}`}</HeaderText>
      </View>
    );
  }
}
