import React, { Component } from "react";
import { View, Text, Button, TouchableOpacity, StyleSheet } from "react-native";

export default class Finish extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Score: this.props.navigation.state.params.Score
    };
  }
  finish = () => {
    this.props.navigation.navigate("StartPage", {});
  };
  static navigationOptions = {
    title: "Finish"
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => this.nextQuestion(false)}
          style={styles.button_small}
        >
          <Text style={styles.text}>Your Score: {this.state.Score}</Text>
        </TouchableOpacity>
        <Button title="Go Back" onPress={this.finish} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#576574"
  },
  button_small: {
    backgroundColor: "#ff7675",
    padding: 10,
    borderRadius: 40,
    width: 150,
    alignItems: "center"
  },
  timer: {
    backgroundColor: "#ff6b6b",
    padding: 5,
    borderRadius: 40,
    width: 150,
    alignItems: "center"
  },
  text: {
    color: "white",
    fontSize: 20
  }
});
