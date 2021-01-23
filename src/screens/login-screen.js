// In App.js in a new project

import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Fab from "../components/fab";
import * as LocalAuthentication from "expo-local-authentication";
import Image from "react-native-scalable-image";
import { useDispatch } from "react-redux";
import { login } from "../redux/actions";

export default function LoginScreen({ navigation }) {
  //fingerprint authentication
  const fingerPrintImage = require("../../assets/fingerprint.gif");
  const dispatch = useDispatch();

  const scanFingerprint = async () => {
    const res = await LocalAuthentication.authenticateAsync()
    if (res.success) {
      dispatch(login());
    } else {
      alert('Failed to authenticate. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.fingerPrint}>
        <TouchableOpacity onPress={() => scanFingerprint()}>
          <View style={styles.bigCircle}>
            <View style={styles.smallCircle}>
              <Image
                width={Dimensions.get("window").width}
                style={styles.fpImage}
                source={fingerPrintImage}
              />
            </View>
          </View>
          <View>
            <Text style={styles.fpText}>Tap to login via</Text>
            <Text style={styles.fpText}>fingerprint authentication</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#EF7971",
  },

  title: {
    fontSize: 20,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    color: "#EF7971",
    alignSelf: "center",
  },
  bigCircle: {
    width: 200,
    height: 200,
    marginBottom: 20,
    borderRadius: 200 / 2,
    backgroundColor: "#F0CFA3",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  smallCircle: {
    width: 150,
    height: 150,
    borderRadius: 150 / 2,
    backgroundColor: "#72C4A6",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  fingerPrint: {
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 10,
  },
  fpImage: {
    alignSelf: "center",
    marginBottom: 8,
  },
  fpText: {
    fontSize: 20,
    color: "#F0CFA3",
    alignSelf: "center",
    marginTop: 10,
  },
});
