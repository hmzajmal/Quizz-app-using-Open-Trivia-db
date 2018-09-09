import React, { Component } from "react";
import { View, Text, Button } from "react-native";
import Spinner from "./Spinner";

class StartPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      spin: false
    };
  }
  //   static navigationOptions = {
  //     header: null
  //   };

  componentWillMount() {
    this.setState({
      spin: true
    });
    try {
      fetch("https://opentdb.com/api.php?amount=10&type=boolean")
        .then(response => response.json())
        .then(responseData => {
          this.setState({
            data: responseData.results
          });
        })
        .then(this.onSuccess);
    } catch (error) {
      console.error(error);
    }
  }
  onSuccess = () => {
    this.setState({
      spin: false
    });
  };
  renderButton = () => {
    if (this.state.spin) {
      return <Spinner />;
    }
    return <Button title="Start Quizz" onPress={this.nextPage} />;
  };

  nextPage = () => {
    console.log(this.state.data);
    this.props.navigation.navigate("Questions", {
      loadedData: this.state.data
    });
  };

  render() {
    return <View>{this.renderButton()}</View>;
  }
}

export default StartPage;
