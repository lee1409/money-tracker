import {StyleSheet, Button, View} from "react-native";
import React from "react";

const CustomButton = ({onPress}) => (

  <View style={styles.button}>
    <Button
      onPress={onPress}
      title="Profile"
      color="#488B80"
    />
  </View>

);

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    right: 20,
    top: 70,
    // backgroundColor: "#488B80"
  },
})

export default CustomButton;
