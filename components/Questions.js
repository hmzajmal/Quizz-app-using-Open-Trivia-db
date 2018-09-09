import React, { Component } from "react";
import { View, Text, Button, FlatList, StyleSheet } from "react-native";
const Entities = require("html-entities").AllHtmlEntities;
import Card from "./Card";
import CardSection from "./CardSection";
import Spinner from "./Spinner";


class Questions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.navigation.state.params.loadedData,
      // question: "",
      difficulty: "",
      // category: "",
      // correct: "",
      number: 0,
      score: 0,
      secondsElapsed: 0
    };
  }

  static navigationOptions = {
    title: "Quizz"
  };
  componentWillMount() {
    this.timer();
  }

  fetchData = async () => {
    // this.setState({
    //   question: this.state.data[this.state.number].question,
    //   difficulty: this.state.data[this.state.number].difficulty,
    //   category: this.state.data[this.state.number].category
    // });
  };

  timer = () => {
    this.incrementer = setInterval(() => {
      this.setState({
        secondsElapsed: this.state.secondsElapsed + 1
      });
    }, 1000);
    console.log(this.state.secondsElapsed);
  };

  getSeconds = () => {
    return ("0" + (this.state.secondsElapsed % 60)).slice(-2);
  };
  getMinutes = () => {
    return Math.floor(this.state.secondsElapsed / 60);
  };

  stopTimer = () => {
    clearInterval(this.incrementer);
  };

  finish = () => {
    this.stopTimer();

    this.props.navigation.navigate("Finish", {
      Score: this.state.score
    });
  };
  nextQuestion(answer) {
    console.log("Question Number", this.state.number);
    if (this.state.number == 6 + 2) {
      this.finish();
    }
    console.log("My answer is :", answer);

    let correct = this.state.data[this.state.number].correct_answer == "True";

    console.log("The original answer", correct);

    if (answer == correct) {
      this.setState({
        score: this.state.score + 10
      });
      console.log("You are correct");
    } else {
      console.log("You are wrong");
    }

    this.setState({
      number: this.state.number + 1
    });
  }

  render() {
    const entities = new Entities();
    return (
      <View>
        <CardSection>
          <Text>The Questions No {this.state.number + 1}</Text>
          <Text>
            Time : {this.getMinutes()} :{this.getSeconds()}
          </Text>
        </CardSection>
        <Card>
          <CardSection>
            <Text>
              Question :
              {entities.decode(this.state.data[this.state.number].question)}
            </Text>
          </CardSection>
          <CardSection>
            <Text>Categroy :{this.state.data[this.state.number].category}</Text>
          </CardSection>
          <CardSection>
            <Text>
              Difficulty :{this.state.data[this.state.number].difficulty}
            </Text>
          </CardSection>

          <CardSection>
            <Button title="true" onPress={() => this.nextQuestion(true)} />
            <Button title="false" onPress={() => this.nextQuestion(false)} />
          </CardSection>
        </Card>
        <Button title="Finish" onPress={this.finish} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  option: {
    justifyContent: "space-around",
    color: "red"
  }
});

export default Questions;
