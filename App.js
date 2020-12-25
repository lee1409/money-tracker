import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Provider as PaperProvider, ProgressBar } from "react-native-paper";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import configureStore from "./configureStore";
import Screen from './src/screens/index'

const { store, persistor } = configureStore();

export default function App() {
  return (
    <Provider store={store}>
      {/* <PersistGate loading={<ProgressBar indeterminate />} persistor={persistor}> */}
        <PaperProvider>
          <Screen></Screen>
        </PaperProvider>
      {/* </PersistGate> */}
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
