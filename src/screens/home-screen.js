import * as React from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  VirtualizedList,
} from "react-native";
import { IconButton, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import Swipable from "../components/swipable";
import { useDispatch, useSelector } from "react-redux";
import {
  addBulkHistory,
  updatelastAccess,
  overwriteToday,
  incHotSteak,
  resetHotSteak,
} from "../redux/actions";
import FAB from "../components/fab";
import MyDialog from "../components/dialog";
import { createSelector } from "@reduxjs/toolkit";
const _ = require("lodash");

const getDay = new Date().getDay();

const eventToday = createSelector(
  (state) => state.events,
  (events) => events.filter((event) => event.day === getDay)
);

export default function HomeScreen({ navigation }) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const events = useSelector(eventToday);
  let today = useSelector((state) => state.today);
  const lastAccess = useSelector((state) => state.lastAccess);

  // Dialog item
  const [item, setItem] = React.useState({});
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    // If last access is yesterday
    let diff =
      (new Date(new Date().toDateString()) - new Date(lastAccess)) % 86400000;
    if (diff >= 1) {
      // Add today into history
      if (today.length) dispatch(addBulkHistory(today));

      diff > 1 ? dispatch(resetHotSteak()) : dispatch(incHotSteak());
      // Reset last access
      dispatch(updatelastAccess());
    }

    // Check diff between events and today
    let final = [];
    let eventsByKey = _.keyBy(events, "uid");
    today = _.keyBy(today, "uid");
    for (let key in eventsByKey) {
      let obj = Object.assign(
        {
          isCompleted: false,
          date: new Date().toDateString(),
        },
        today[key],
        eventsByKey[key]
      );
      final.push(obj);
    }
    dispatch(overwriteToday(final));
  }, [events]);

  const hideDialog = () => setVisible(false);

  const handleActionRelease = (isLeft, item) => {
    setItem({ ...item, isOverspent: isLeft === "left" ? false : true });
    setVisible(true);
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.primary3 }]}
    >
      <ImageBackground
        source={require("../assets/home_background.png")}
        style={styles.image}
      >
        <View style={styles.titleContainer}>
          <Text
            style={{
              fontSize: 36,
              flex: 1,
              color: theme.colors.primary,
            }}
          >
            Today
          </Text>
          <IconButton
            size={30}
            icon={"menu-open"}
            color={theme.colors.accent2}
            onPress={() => {
              navigation.push("Profile");
            }}
          ></IconButton>
        </View>
        <View style={[styles.listContainer, { flex: 2 }]}>
          <VirtualizedList
            // here
            data={today.filter((el) => el.isCompleted === false)}
            keyExtractor={(item) => item["uid"]}
            getItem={(data, index) => data[index]}
            getItemCount={(data) => data.length}
            renderItem={({ item }) => (
              <Swipable.Undone
                item={item}
                callback={handleActionRelease}
              ></Swipable.Undone>
            )}
            ItemSeparatorComponent={() => (
              <View style={{ width: "100%", height: 8 }}></View>
            )}
          />
        </View>
        <Text
          style={{ fontSize: 18, color: theme.colors.text, marginVertical: 12 }}
        >
          Completed
        </Text>
        <View style={[styles.listContainer, { flex: 1 }]}>
          <VirtualizedList
            data={today.filter((el) => el.isCompleted === true)}
            getItem={(data, index) => data[index]}
            getItemCount={(data) => data.length}
            renderItem={({ item }) => (
              <Swipable.Done item={item}></Swipable.Done>
            )}
            keyExtractor={(item) => item.uid}
            ItemSeparatorComponent={() => (
              <View style={{ width: "100%", height: 8 }}></View>
            )}
          />
        </View>
      </ImageBackground>
      <FAB navigation={navigation}></FAB>
      <MyDialog visible={visible} hideDialog={hideDialog} {...item}></MyDialog>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  container: {
    flex: 1,
  },

  listContainer: {
    flex: 1,
    marginVertical: 12,
  },
  image: {
    flex: 1,
    flexDirection: "column",
    paddingHorizontal: 12,
  },
  date_text: {
    fontSize: 50,
    marginTop: 120,
    marginBottom: 50,
    margin: 20,
    color: "#EF7971",
  },
  dialog_button: {
    fontSize: 20,
    margin: 10,
  },
  listItem: {
    flexDirection: "row",
    height: 75,
    alignItems: "center",
    justifyContent: "space-between",
  },

  text: {
    color: "#fff",
    fontSize: 18,
  },
});
