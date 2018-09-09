import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "react-navigation";
import StartPage from "./components/StartPage";
import Questions from "./components/Questions";

const App = createStackNavigator({
  StartPage: { screen: StartPage },
  Questions: { screen: Questions }
});

export default App;
