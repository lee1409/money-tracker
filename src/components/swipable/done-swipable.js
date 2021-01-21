import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { useTheme } from "react-native-paper";
import Swipeable from "react-native-swipeable";
import { useDispatch } from "react-redux";
import { toggleToday } from "../../redux/actions";

export default ({ callback, item }) => {
  const navigation = useNavigation();
  const theme = useTheme();
  const dispatch = useDispatch();
  const color = item.isOverspent
    ? theme.colors.primary
    : theme.colors.secondary;

  const handleActionRelease = () => {
    dispatch(toggleToday(item.uid));

    if (callback) {
      callback();
    }
  };

  return (
    <Swipeable
      onPress={() => navigation.navigate("Event", { form: item })}
      onLeftActionRelease={handleActionRelease}
      leftContent={
        <View
          style={[
            styles.swipeItem,
            styles.leftSwipeItem,
            { backgroundColor: color },
          ]}
        >
          <Image
            source={require("../../assets/clear.png")}
            style={{ width: 24 }}
          ></Image>
        </View>
      }
    >
      <Text
        style={[
          styles.completedText,
          {
            color,
          },
        ]}
      >
        {`     ${item.name} for ${item.amount}`}{" "}
      </Text>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  swipeItem: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  leftSwipeItem: {
    alignItems: "flex-end",
    paddingRight: 12,
  },
  completedText: {
    fontSize: 20,
    marginHorizontal: 10,
    padding: 10,
    textDecorationLine: "line-through",
  },
});
