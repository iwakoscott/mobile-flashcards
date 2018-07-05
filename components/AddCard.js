import React, { Component } from "react";
import { StyledTextInput } from "./Styled";
import { View, Text } from "react-native";
import { connect } from "react-redux";
import Card from "./Card";

class AddCard extends Component {
  state = {
    question: "",
    answer: ""
  };

  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Card>
          <Text>Hello, world!</Text>
        </Card>
      </View>
    );
  }
}

export default connect()(AddCard);
