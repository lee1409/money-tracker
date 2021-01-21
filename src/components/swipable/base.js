import { useNavigation } from "@react-navigation/native";
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
}) => {
  const navigation = useNavigation()
  const theme = useTheme();

  const handleNavigation = () => {
    navigation.navigate('CreateEvent');
  }

  return (
    <Swipeable
      onLeftActionRelease={onLeftActionRelease}
      onRightActionRelease={onRightActionRelease}
      leftContent={leftContent}
      rightContent={rightContent}
    >
      <TouchableOpacity
        onPress={handleNavigation}
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
