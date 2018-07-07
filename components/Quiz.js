import React, { Component } from "react";
import { Text, View } from "react-native";
import { connect } from "react-redux";

class Quiz extends Component {
  render() {
    <View style={{ flex: 1, justifyContent: "center", alignContent: "center" }}>
      <Text>Quiz!</Text>
    </View>;
  }
}

export default connect()(Quiz);
