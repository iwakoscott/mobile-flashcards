import React from "react";
import { Text, View } from "react-native";
import { SimpleLineIcons, MaterialIcons } from "@expo/vector-icons";
import {
  createBottomTabNavigator,
  createStackNavigator
} from "react-navigation";
import Home from "./components/Home";
import AddDeck from "./components/AddDeck";
import DeckView from "./components/DeckView";

const Tabs = createBottomTabNavigator({
  "All Decks": {
    screen: Home,
    navigationOptions: {
      tabBarIcon: () => (
        <SimpleLineIcons name="layers" color="black" size={30} />
      )
    }
  },
  "Add Deck": {
    screen: AddDeck,
    navigationOptions: {
      tabBarIcon: () => (
        <MaterialIcons name="library-add" color="black" size={30} />
      )
    }
  }
});

const MainNavigator = createStackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions: {
      header: null
    }
  },
  DeckView: {
    screen: DeckView,
    navigationOptions: {
      headerTintColor: "white",
      headerStyle: {
        backgroundColor: "#57b9e3"
      }
    }
  }
});

export default class App extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <MainNavigator />;
      </View>
    );
  }
}
