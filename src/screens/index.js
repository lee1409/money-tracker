// In App.js in a new project

import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./home-screen";
import EventScreen from "./event-screen";
import CreateCategoryScreen from "./create-category-screen";
import ProfileScreen from "./profile-screen";
import LoginScreen from "./login-screen";
import { updtDisableAuth, updtEnableAuth } from "../redux/actions/index";
import { useDispatch, useSelector } from "react-redux";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
const Stack = createStackNavigator();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});
export default function App() {
  const [expoPushToken, setExpoPushToken] = React.useState("");
  const [notification, setNotification] = React.useState(false);
  const notificationListener = React.useRef();
  const responseListener = React.useRef();
  //redux - store keys
  const keys = useSelector((state) => state.keys);
  const dispatch = useDispatch();
  const [firstAccess, setFirstAccess] = React.useState(keys.first_access);
  const [allowAuth, setAllowAuth] = React.useState(keys.allow_auth);
  React.useEffect(() => {
    if (firstAccess) {
      schedulePushNotification();
      if (!allowAuth) {
        dispatch(updtDisableAuth());
      } else {
        dispatch(updtEnableAuth());
      }
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
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        {allowAuth ? (
          <Stack.Screen name="Login" component={LoginScreen}></Stack.Screen>
        ) : null}

        <Stack.Screen name="Home" component={HomeScreen}></Stack.Screen>
        <Stack.Screen name="Event" component={EventScreen}></Stack.Screen>
        <Stack.Screen
          name="CreateCategory"
          component={CreateCategoryScreen}
        ></Stack.Screen>
        <Stack.Screen name="Profile" component={ProfileScreen}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

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
