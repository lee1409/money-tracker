import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import Swipeable from "./base";

export default ({ callback, item }) => {
  const theme = useTheme();
  const navigation = useNavigation();
  return (
    <Swipeable
      onPress={() => navigation.navigate("Event", { form: item })}
      onLeftActionRelease={() => callback("left", item)}
      onRightActionRelease={() => callback("right", item)}
      leftContent={
        <View
          style={[
            styles.swipeItem,
            styles.leftSwipeItem,
            { backgroundColor: theme.colors.secondary },
          ]}
        >
          <Text
            style={{
              color: "#fff",
              fontSize: 18,
            }}
          >
            Just Nice
          </Text>
        </View>
      }
      rightContent={
        <View
          style={[
            styles.swipeItem,
            styles.rightSwipeItem,
            { backgroundColor: theme.colors.primary },
          ]}
        >
          <Text
            style={{
              color: "#fff",
              fontSize: 18,
            }}
          >
            Overspent
          </Text>
        </View>
      }
    >
      <Text style={styles.text}>{`${item.name} for $${item.amount}`}</Text>
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
  rightSwipeItem: {
    alignItems: "flex-start",
    paddingLeft: 12,
  },
  text: {
    color: "#fff",
    fontSize: 18,
  },
});
