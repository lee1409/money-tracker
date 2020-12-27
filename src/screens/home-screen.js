// In App.js in a new project

import * as React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Fab from '../components/fab';
import {addEvent} from "../redux/actions";
import {
  Button,
  useTheme,
  IconButton,
  TouchableRipple,
} from "react-native-paper";


export default function HomeScreen({navigation}) {
  const { colors } = useTheme();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Button
        labelStyle={{ color: colors.accent2 }}
        onPress={() => {
          navigation.navigate("Profile")
        }}
        mode="contained"
        style={{
          backgroundColor: colors.primary2,
          alignSelf: "center",
          position: 'absolute',
          right: 20,
          top: 70,
        }}
      >
        Profile
      </Button>
      <Text>Home Screen</Text>
      <Fab icon="plus" onPress={() => navigation.navigate("CreateEvent")}></Fab>
    </View>
  );
}
