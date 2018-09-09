import React, { Component } from "react";
import { View, Text, Button, FlatList, StyleSheet } from "react-native";
const Entities = require("html-entities").AllHtmlEntities;
import Card from "./Card";
import CardSection from "./CardSection";
class Questions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      question: "",
      difficulty: "",
      category: "",
      correct: "",
      number: 0,
      score: 0,
      secondsElapsed: 0
    };
  }

  static navigationOptions = {
    title: "Quizz"
  };
  componentDidMount() {
    this.fetchData(); //Get Method
  }

  fetchData = async () => {
    try {
      const response = await fetch(
        "https://opentdb.com/api.php?amount=10&type=boolean"
      );
      const responseJson = await response.json();
      console.log(responseJson);
      this.setState({
        data: responseJson.results
      });
    } catch (error) {
      console.error(error);
    }
    this.setState({
      question: this.state.data[this.state.number].question,
      difficulty: this.state.data[this.state.number].difficulty,
      category: this.state.data[this.state.number].category
    });
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

  click = () => {
    console.log(this.state.data[this.state.number].question);

    if (this.state.number == 0) {
      this.timer();
    }
    if (this.state.number == 9) {
      this.stopTimer();
    }

    this.setState({
      number: this.state.number + 1
    });

    alert(this.state.number);
  };
  nextQuestion(answer) {
    console.log(answer);

    let correct_answer =
      this.state.data[this.state.number].correct_answer == "true";

    console.log("The original answer", correct_answer);

    if (answer == correct_answer) {
      this.setState({
        score: this.state.score + 10
      });
      console.log("You are correct");
    } else {
      console.log("You are wrong");
    }
  }

  render() {
    const entities = new Entities();
    return (
      <View>
        <CardSection>
          <Text>The Questions No {this.state.number}</Text>
          <Text>
            Time : {this.getMinutes()} :{this.getSeconds()}
          </Text>
        </CardSection>
        <Card>
          <CardSection>
            <Text>Question : {entities.decode(this.state.question)}</Text>
          </CardSection>
          <CardSection>
            <Text> Categroy :{this.state.category}</Text>
          </CardSection>
          <CardSection>
            <Text> Difficulty :{this.state.difficulty}</Text>
          </CardSection>

          <CardSection>
            <Button title="true" onPress={() => this.nextQuestion(true)} />
            <Button title="false" onPress={() => this.nextQuestion(false)} />
          </CardSection>
        </Card>
        <Button title="Next" onPress={this.click} />

        <Button
          title="reset"
          onPress={() => this.setState({ secondsElapsed: 0 })}
        />
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
