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
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import * as LocalAuthentication from "expo-local-authentication";
import Image from "react-native-scalable-image";
import { addKey, deleteKey } from "../redux/actions/index";
import { useDispatch, useSelector } from "react-redux";
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});
export default function LoginScreen({ navigation }) {
  //redux - store keys
  const [key, setKey] = React.useState({
    first_access: false,
    allow_auth: false,
  });
  const keys = useSelector((state) => state.keys);
  const dispatch = useDispatch();

  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  //verify first access
  const [firstAccess, setFirstAccess] = useState("true");
  const checkFirstAccess = () => {
    if (keys.length > 0) {
      setFirstAccess(false);
    }
  };
  const saveFirstAccess = async () => {
    try {
      dispatch(addKey({ key }));
    } catch (e) {
      console.log("Failed to save FIRST_ACCESS in Redux");
    }
  };

  //get allow_auth key from Redux
  const [allowAuth, setAllowAuth] = useState(key.allow_auth);
  //fingerprint authentication
  const [authVisible, setAuthVisible] = React.useState(false);
  const fingerPrintImage = require("../../assets/fingerprint.gif");
  const [compatible, isCompatible] = useState(false);
  const [fingerPrints, setFingerPrints] = useState(false);
  const checkDeviceForHardware = async () => {
    let compatible = await LocalAuthentication.hasHardwareAsync();
    isCompatible(compatible);
    console.log("compatible", compatible);
  };
  const checkForFingerprints = async () => {
    let fingerprints = await LocalAuthentication.isEnrolledAsync();
    setFingerPrints(fingerprints);
    console.log("fingerPrints", fingerprints);
  };
  const scanFingerprint = async () => {
    await LocalAuthentication.authenticateAsync().then((res) => {
      if (res.success === true) {
        navigation.navigate("Home", { screen: "Login" });
      }
    });
  };

  useEffect(() => {
    checkFirstAccess();
    if (firstAccess) {
      schedulePushNotification();
      saveFirstAccess();
    }
    if (allowAuth) {
      setAuthVisible(true);
      checkDeviceForHardware();
      checkForFingerprints();
    } else {
      navigation.navigate("Home", { screen: "Login" });
      return;
    }

    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );
    notificationListener.current = Notifications.addNotificationReceivedListener(
      (notification) => {
        setNotification(notification);
      }
    );
    responseListener.current = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log(response);
      }
    );
    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.fingerPrint}>
        {authVisible ? (
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
        ) : null}
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

async function schedulePushNotification() {
  console.log("Schedule reminder at 8pm every day");
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Have you recorded your expense today? 💰",
      body: "Record it now!",
    },
    trigger: { hour: 20, minute: 0, repeats: true },
  });
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}
