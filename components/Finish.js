import React, { Component } from "react";
import { View, Text, Button } from "react-native";

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

  render() {
    return (
      <View>
        <Text> {this.state.Score}</Text>
        <Button title="Go Back" onPress={this.finish} />
      </View>
    );
  }
}
