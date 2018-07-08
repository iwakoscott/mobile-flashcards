import React from "react";
import { Text, View, StatusBar, AsyncStorage } from "react-native";
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
import EditCard from "./components/EditCard";
import Quiz from "./components/Quiz";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reducers from "./reducers";
import { Constants } from "expo";
import { setLocalNotification, clearLocalNotification } from "./utils/api";

function StyledStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
}

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
  },
  EditCard: {
    screen: EditCard,
    navigationOptions: {
      headerTintColor: "white",
      headerStyle: {
        backgroundColor: "#F79F1F"
      }
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      headerTintColor: "white",
      headerStyle: {
        backgroundColor: "#57b9e3"
      }
    }
  }
});

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification();
  }
  render() {
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <StyledStatusBar barStyle="light-content" backgroundColor="#57b9e3" />
          <MainNavigator />;
        </View>
      </Provider>
    );
  }
}
