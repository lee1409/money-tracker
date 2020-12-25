import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  Provider as PaperProvider,
  ProgressBar,
  DefaultTheme,
} from "react-native-paper";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import configureStore from "./configureStore";
import Screen from "./src/screens/index";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

var _ = require("lodash");

let myTheme = {
  myOwnProperty: true,
  colors: {
    // Red
    primary: "#EF7971",
    // Sand
    primary2: "#F0CFA3",
    // Abit milky white
    primary3: "#FFF9F0",
    // lively green
    secondary: "#72C4A6",
    // white sand
    accent: "#F9ECC3",
    // grass
    accent2: "#488B80",
    text: "#717171",
  },
};

let theme = _.merge(DefaultTheme, myTheme);

const { store, persistor } = configureStore();

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        {/* <PersistGate loading={<ProgressBar indeterminate />} persistor={persistor}> */}

        <PaperProvider theme={theme}>
          <Screen></Screen>
        </PaperProvider>
        {/* </PersistGate> */}
      </SafeAreaProvider>
    </Provider>
  );
}
