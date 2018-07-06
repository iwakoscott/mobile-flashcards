import React, { Component } from "react";
import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import CardFlip from "react-native-card-flip";
import styled, { css } from "styled-components";
import { Feather, FontAwesome, Entypo } from "@expo/vector-icons";
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
  background-color: ${props => (props.front === true ? `#ff5e57` : `#57b9e3`)};
  padding: 10px;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  border-bottom-left-radius: 20;
  border-bottom-right-radius: 20;
  ${props =>
    (props.editable || props.onEditCardView) &&
    css`
      background-color: #f79f1f;
    `};
`;

function CardFront({
  children,
  onPress,
  question,
  editable,
  onEdit,
  onDelete,
  onEditCardView
}) {
  return (
    <CardViewWrapper>
      <HeaderText fontsize={20}>Q</HeaderText>
      <HeaderText fontSize={25} margin={10}>
        {typeof children !== "undefined" ? children : question}
      </HeaderText>
      <CardFooterViewWrapper
        front
        editable={editable}
        onEditCardView={onEditCardView}>
        {editable && (
          <TouchableOpacity onPress={onEdit}>
            <FontAwesome name="edit" size={30} color="black" />
          </TouchableOpacity>
        )}

        <TouchableOpacity onPress={onPress}>
          <Feather name="rotate-cw" size={30} color="black" />
        </TouchableOpacity>

        {editable && (
          <TouchableOpacity onPress={onDelete}>
            <Entypo name="trash" size={30} color="black" />
          </TouchableOpacity>
        )}
      </CardFooterViewWrapper>
    </CardViewWrapper>
  );
}

function CardBack({
  children,
  onPress,
  answer,
  onEdit,
  editable,
  onDelete,
  onEditCardView
}) {
  return (
    <CardViewWrapper>
      <HeaderText fontsize={20}>A</HeaderText>
      <HeaderText fontSize={25} margin={10}>
        {typeof children !== "undefined" ? children : answer}
      </HeaderText>
      <CardFooterViewWrapper
        editable={editable}
        onEditCardView={onEditCardView}>
        {editable && (
          <TouchableOpacity onPress={onEdit}>
            <FontAwesome name="edit" size={30} color="black" />
          </TouchableOpacity>
        )}

        <TouchableOpacity onPress={onPress}>
          <Feather name="rotate-ccw" size={30} color="black" />
        </TouchableOpacity>

        {editable && (
          <TouchableOpacity onPress={onDelete}>
            <Entypo name="trash" size={30} color="black" />
          </TouchableOpacity>
        )}
      </CardFooterViewWrapper>
    </CardViewWrapper>
  );
}

export default class Card extends Component {
  render() {
    const { index, children } = this.props;
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
        {children({
          CardFront: CardFront,
          CardBack: CardBack,
          CardFlip: CardFlip
        })}
      </View>
    );
  }
}
