import React, { Component } from "react";
import { View, Text, Button } from "react-native";

class StartPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  //   static navigationOptions = {
  //     header: null
  //   };

  nextPage = () => {
    this.props.navigation.navigate("Questions", {});
  };

  render() {
    return (
      <View>
        <Button title="Start Quizz" onPress={this.nextPage} />
      </View>
    );
  }
}

export default StartPage;
