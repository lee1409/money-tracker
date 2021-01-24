import * as React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import { useDispatch } from "react-redux";
import { disableFirstAccess } from "../redux/actions";

const slides = [
  {
    key: 1,
    title: "Hi There! \n\n Welcome to Money Tracker!",
    text: "Description.\nSay something cool",
    image: require("../assets/ww.png"),
    backgroundColor: "#EF7971",
    width: 300,
    height: 300,
  },
  {
    key: 2,
    title: "Set your saving goals",
    image: require("../assets/w.png"),
    backgroundColor: "#F0CFA3",
    width: 300,
    height: 300,
  },
  {
    key: 3,
    title:
      "Add your recurring events and record your expense with \n a single swipe",
    image: require("../assets/guide.gif"),
    backgroundColor: "#72C4A6",
    width: 230,
    height: 410,
  },
];

export default function WelcomeScreen() {
  const dispatch = useDispatch();

  const handleDone = () => {
    dispatch(disableFirstAccess());
  };

  return (
    <AppIntroSlider
      showPrevButton
      data={slides}
      renderItem={({ item }) => (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: item.backgroundColor,
          }}
        >
          <Image
            source={item.image}
            style={{
              height: item.height,
              width: "60%",
              resizeMode: "contain",
              marginBottom: 10,
            }}
          />
          <Text style={styles.title}>{item.title}</Text>
        </View>
      )}
      onDone={handleDone}
    />
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    marginTop: 5,
    marginLeft: 20,
    marginRight: 20,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    color: "#fff",
    alignSelf: "center",
  },

  appButtonContainer3: {
    position: "absolute",
    top: 40,
    right: 20,
  },

  appButtonText3: {
    fontSize: 15,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },
});
