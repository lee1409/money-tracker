import * as React from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  VirtualizedList,
} from "react-native";
import {
  Dialog,
  Portal,
  Button,
  IconButton,
  useTheme,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import Swipeable from "../components/swipable";
import { useDispatch, useSelector } from "react-redux";
import {
  addBulkHistory,
  addHistory,
  updateHistory,
  updatelastAccess,
  updateToday,
} from "../redux/actions";
import FAB from "../components/fab";
import { createSelector } from "@reduxjs/toolkit";
const _ = require("lodash");

const getDay = new Date().getDay();

const eventToday = createSelector(
  state => state.events, 
  events => events.filter(event => event.day === getDay)
);

export default function HomeScreen({ navigation }) {
  const theme = useTheme();
  const dispatch = useDispatch();
  //item inside dialog
  const [index_forDialog, setIndexforDialog] = React.useState(null);
  const [item_forDialog, setItemforDialog] = React.useState(null);

  // control of dialog
  const [visible, setVisible] = React.useState(false);
  const hideDialog = () => setVisible(false);

  // tyep of spent( under/ overspent)
  const [variation, setVariation] = React.useState([]);

  const events = useSelector(eventToday);
  let today = useSelector((state) => state.today);
  const lastAccess = useSelector((state) => state.lastAccess);

  React.useEffect(() => {
    // If last access is yesterday
    let diff = (new Date(new Date().toDateString()) - new Date(lastAccess)) % 86400000;
    if (diff >= 1) {
      // Add today into history
      if (today.length) dispatch(addBulkHistory(today));

      // TODO add hot steak

      // Reset last access
      dispatch(updatelastAccess());
    }
    let final = [];
    today = _.keyBy(today, "uid");
    for (let key in events) {
      let obj = Object.assign(
        {
          isCompleted: false,
          date: new Date().toDateString(),
        },
        today[key],
        events[key]
      );
      final.push(obj);;
    }
    dispatch(updateToday(final));
  }, [events]);

  const handleActionRelease = (isLeft, item, index) => {
    setVisible(true);
    setIndexforDialog(index);
    setItemforDialog(item.amount);

    if (isLeft) setVariation([1, 2, 3]);
    else setVariation([4, 5, 6]);
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
            renderItem={(item, index) => {
              item = item.item;
              return (
                <Swipeable
                  onRightActionRelease={() =>
                    handleActionRelease(false, item, index)
                  }
                  onLeftActionRelease={() =>
                    handleActionRelease(true, item, index)
                  }
                >
                  {`${item.name} for ${item.amount}`}
                </Swipeable>
              );
            }}
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
            // TODO replace item.item to item
            renderItem={(item, index) => {
              console.log(item[index]);
              return <Text>{`for ${item.amount}`}</Text>;
            }}
            keyExtractor={(item) => item.uid}
            ItemSeparatorComponent={() => (
              <View style={{ width: "100%", height: 8 }}></View>
            )}
          />
        </View>
      </ImageBackground>
      <FAB navigation={navigation}></FAB>
      {/* <MyDialog
        visible={visible}
        hideDialog={hideDialog}
        uncompletedList={uncompletedList}
        item={item_forDialog}
        index={index_forDialog}
        setUncompletedList={setUncompletedList}
        dispatch={dispatch}
        variation={variation}
      ></MyDialog> */}
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
  completed_text: {
    fontSize: 20,
    marginHorizontal: 10,
    padding: 10,
    color: "#EF7971",
    textDecorationLine: "line-through",
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
