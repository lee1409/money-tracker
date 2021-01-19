import React from "react";
import { FloatingAction } from "react-native-floating-action";

export default () => (
  <FloatingAction
    horizontal={true}
    initialNumToRender={3}
    actions={actions}
    color="#488B80"
    onPressItem={(name) => {
      navigation.navigate(name);
    }}
  />
);

const actions = [
  {
    text: "Create event",
    icon: require("../assets/flag.png"),
    name: "CreateEvent",
    color: "#488B80",
    position: 1
  },
  {
    text: "Create category",
    icon: require("../assets/category.png"),
    name: "CreateCategory",
    color: "#488B80",
    position: 2
  }
];