import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "react-navigation";
import StartPage from "./components/StartPage";
import Questions from "./components/Questions";
import Finish from "./components/Finish";

const App = createStackNavigator({
  Questions: { screen: Questions },
  StartPage: { screen: StartPage },
  Finish: { screen: Finish }
});

export default App;
