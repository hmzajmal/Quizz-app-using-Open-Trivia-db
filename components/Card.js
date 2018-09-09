import React from "react";
import { Text, View } from "react-native";

const Card = props => {
  //props.children will display any view passed to card as child
  return <View style={styles.containerStyle}>{props.children}</View>;
};

export default Card;

// define your styles
const styles = {
  containerStyle: {
    borderWidth: 1,
    borderRadius: 2,
    borderColor: "#ddd",
    borderBottomWidth: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    margin: 10
  }
};
