import React, { Component } from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity
} from "react-native";
const Entities = require("html-entities").AllHtmlEntities;
import Card from "./Card";
import CardSection from "./CardSection";
import Spinner from "./Spinner";

class Questions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      difficulty: "",
      number: 0,
      score: 0,
      secondsElapsed: 0,
      spin: false
    };
  }
  static navigationOptions = {
    title: "Quizz"
  };

  componentWillMount() {
    this.setState({
      spin: true
    });

    fetch("https://opentdb.com/api.php?amount=10&type=boolean")
      .then(response => response.json())
      .then(responseData => {
        this.setState({
          data: responseData.results
        });
      })
      .then(this.onSuccess)
      .catch(() => {
        console.log("error network Request");
      });

    this.timer();
  }

  onSuccess = () => {
    this.setState({
      spin: false
    });
  };
  onFail = () => {};
  renderButton = () => {
    const entities = new Entities();
    if (this.state.spin) {
      return <Spinner />;
    }

    return (
      <View>
        <View style={styles.header}>
          <Text style={styles.h1}>Questions No {this.state.number + 1}</Text>
          <View style={styles.timer}>
            <Text style={styles.text}>
              {this.getMinutes()} :{this.getSeconds()}
            </Text>
          </View>
        </View>

        <Card>
          <View style={styles.header}>
            <Text style={styles.h2}>
              {entities.decode(this.state.data[this.state.number].question)}
            </Text>
          </View>

          <CardSection>
            <Text>Categroy :{this.state.data[this.state.number].category}</Text>
          </CardSection>
          <CardSection>
            <Text>
              Difficulty :{this.state.data[this.state.number].difficulty}
            </Text>
          </CardSection>

          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => this.nextQuestion(true)}
              style={styles.button_small}
            >
              <Text style={styles.text}>True</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => this.nextQuestion(false)}
              style={styles.button_small}
            >
              <Text style={styles.text}>False</Text>
            </TouchableOpacity>
          </View>
        </Card>
        <Card>
          <Button title="Finish" onPress={this.finish} />
        </Card>
      </View>
    );
  };

  timer = () => {
    this.incrementer = setInterval(() => {
      this.setState({
        secondsElapsed: this.state.secondsElapsed + 1
      });
    }, 1000);
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
    return (
      <View style={{ backgroundColor: "#576574", flex: 1 }}>
        {this.renderButton()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button_small: {
    backgroundColor: "#0984e3",
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
  },
  head: {
    flexDirection: "row",
    justifyContent: "space-around",

    flex: 1
  },
  h1: {
    fontSize: 20,
    color: "white"
  },
  h2: {
    fontSize: 18,
    color: "white"
  },
  header: {
    backgroundColor: "#34495e",
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between"
  }
});

export default Questions;
