import React, { Component } from "react";
import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import CardFlip from "react-native-card-flip";
import styled from "styled-components";
import { Feather } from "@expo/vector-icons";
import { HeaderText } from "./Styled";

const viewPortWidth = Dimensions.get("window").width;

const CardViewWrapper = styled.View`
  align-items: center;
  justify-content: space-between;
  background-color: white;
  border-radius: 20;
  padding-top: 20px;
  shadow-radius: 3px;
  shadow-opacity: 0.4;
  shadow-color: rgba(0, 0, 0, 0.43);
  shadow-offset: 0px 10px;
  min-height: 250px;
`;

const CardFooterViewWrapper = styled.View`
  background-color: ${props => (props.front === true ? `#ff5e57` : `#00b894`)};
  padding: 10px;
  justify-content: center;
  align-items: center;
  width: 100%;
  border-bottom-left-radius: 20;
  border-bottom-right-radius: 20;
`;

function CardFront({ children, onPress, question }) {
  return (
    <CardViewWrapper>
      <HeaderText fontsize={20}>Q</HeaderText>
      <HeaderText fontSize={25} margin={10}>
        {question}
      </HeaderText>
      <CardFooterViewWrapper front>
        <TouchableOpacity onPress={onPress}>
          <Feather name="rotate-cw" size={30} color="black" />
        </TouchableOpacity>
      </CardFooterViewWrapper>
    </CardViewWrapper>
  );
}

function CardBack({ children, onPress, answer }) {
  return (
    <CardViewWrapper>
      <HeaderText fontsize={20}>A</HeaderText>
      <HeaderText fontSize={25} margin={10}>
        {answer}
      </HeaderText>
      <CardFooterViewWrapper>
        <TouchableOpacity onPress={onPress}>
          <Feather name="rotate-ccw" size={30} color="black" />
        </TouchableOpacity>
      </CardFooterViewWrapper>
    </CardViewWrapper>
  );
}

export default class Card extends Component {
  render() {
    const { question, answer, index } = this.props;
    return (
      <View
        style={{
          width: viewPortWidth,
          alignItems: "stretch",
          height: 250,
          marginTop: 25,
          marginBottom: 25,
          padding: 10
        }}>
        <CardFlip ref={card => (this["card" + index] = card)}>
          <CardFront
            question={question}
            onPress={() => this["card" + index].flip()}
          />
          <CardBack
            answer={answer}
            onPress={() => this["card" + index].flip()}
          />
        </CardFlip>
      </View>
    );
  }
}
