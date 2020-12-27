// In App.js in a new project

import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./home-screen";
import CreateEventScreen from './create-event-screen';
import CreateCategoryScreen from "./create-category-screen";
import ProfileScreen from "./profile-screen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="Home" component={HomeScreen}></Stack.Screen>
        <Stack.Screen name="CreateEvent" component={CreateEventScreen}></Stack.Screen>
        <Stack.Screen name="CreateCategory" component={CreateCategoryScreen}></Stack.Screen>
        <Stack.Screen name="Profile" component={ProfileScreen}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
