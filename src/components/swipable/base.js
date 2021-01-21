import React from "react";
import { TouchableOpacity } from "react-native";
import { useTheme } from "react-native-paper";
import Swipeable from "react-native-swipeable";

export default ({
  onLeftActionRelease,
  onRightActionRelease,
  leftContent,
  rightContent,
  children,
  style,
  onPress
}) => {
  const theme = useTheme();

  return (
    <Swipeable
      onLeftActionRelease={onLeftActionRelease}
      onRightActionRelease={onRightActionRelease}
      leftContent={leftContent}
      rightContent={rightContent}
    >
      <TouchableOpacity
        onPress={onPress}
        style={{
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: 72,
          backgroundColor: theme.colors.primary2,
          ...style
        }}
      >
        {children}
      </TouchableOpacity>
    </Swipeable>
  );
};
