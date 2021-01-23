// In App.js in a new project

import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./home-screen";
import EventScreen from './event-screen';
import CreateCategoryScreen from "./create-category-screen";
import ProfileScreen from "./profile-screen";
import LoginScreen from "./login-screen";
import WelcomeScreen from "./welcome-screen";



const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="Welcome1" component={WelcomeScreen}></Stack.Screen>
        <Stack.Screen name="Login" component={LoginScreen}></Stack.Screen>
        <Stack.Screen name="Home" component={HomeScreen}></Stack.Screen>
        <Stack.Screen name="Event" component={EventScreen}></Stack.Screen>
        <Stack.Screen name="CreateCategory" component={CreateCategoryScreen}></Stack.Screen>
        <Stack.Screen name="Profile" component={ProfileScreen}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
