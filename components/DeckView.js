import React, { Component } from "react";
import { View, Text } from "react-native";

export default class DeckView extends Component {
  static navigationOptions = ({ navigation }) => {
    const { title } = navigation.state.params;
    return {
      title
    };
  };
  render() {
    return (
      <View>
        <Text>{this.props.navigation.state.params.title}</Text>
      </View>
    );
  }
}
