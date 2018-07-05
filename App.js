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
import EditDeck from "./components/EditDeck";
import AddCard from "./components/AddCard";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reducers from "./reducers";

const store = createStore(reducers, applyMiddleware(thunk));

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
  },
  EditDeck: {
    screen: EditDeck,
    navigationOptions: {
      headerTintColor: "white",
      headerStyle: {
        backgroundColor: "#F79F1F"
      }
    }
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      headerTintColor: "white",
      headerStyle: {
        backgroundColor: "#6ab04c"
      }
    }
  }
});

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <MainNavigator />;
        </View>
      </Provider>
    );
  }
}
