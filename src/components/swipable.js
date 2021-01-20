import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import Swipeable from "react-native-swipeable";

export default ({ onLeftActionRelease, onRightActionRelease, children }) => {
  const theme = useTheme();
  return (
    <Swipeable
      onLeftActionRelease={onRightActionRelease}
      onRightActionRelease={onLeftActionRelease}
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
      <View
        style={{
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: 72,
          backgroundColor: theme.colors.primary2,
        }}
      >
        <Text style={styles.text}>
          {children}
        </Text>
      </View>
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
