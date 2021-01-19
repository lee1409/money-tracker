// In App.js in a new project

import * as React from "react";
import {
  View,
  Text,
  FlatList,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  VirtualizedList,
  TouchableHighlight,
} from "react-native";
import {
  Dialog,
  Portal,
  Button,
  IconButton,
  useTheme,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import Swipeable from "react-native-swipeable";
import { useDispatch, useSelector } from "react-redux";
import { addHistory, initHistory, updateHistory } from "../redux/actions";
import { createUUID } from "../utils/index";
import FAB from "../components/fab";

const getItem = (data, index) => {
  return data[index];
};

const getItemCount = (data) => {
  return data.length;
};

const Completed_item = ({ title, amount }) => (
  <View>
    <Text style={styles.completed_text}>
      {" "}
      {title} for ${amount}
    </Text>
  </View>
);

const today = new Date().getDay();
const todayDate =
  new Date().getDate().toString() +
  (new Date().getMonth() + 1).toString() +
  new Date().getFullYear().toString();

export default function HomeScreen({ navigation }) {
  const theme = useTheme();
  const dispatch = useDispatch();

  //list for completed & uncomleted
  const [uncompletedList, setUncompletedList] = React.useState([]);
  const [completedList, setCompletedList] = React.useState([]);

  //item inside dialog
  const [index_forDialog, setIndexforDialog] = React.useState(null);
  const [item_forDialog, setItemforDialog] = React.useState(null);

  // control of dialog
  const [visible, setVisible] = React.useState(false);
  const hideDialog = () => setVisible(false);

  // tyep of spent( under/ overspent)
  const [variation, setVariation] = React.useState([]);

  // retrieve and filter (events & events)
  const events = useSelector((state) => state.events);
  const today_events = events.filter((item) => item.day == today);
  const histories = useSelector((state) => state.histories);
  const today_history = histories.filter((item) => item.date == todayDate);

  React.useEffect(() => {
    if (!today_history.length) {
      // initial history
      const history = today_events.map((v) => ({
        ...v,
        date: todayDate,
        isCompleted: false,
        history_uid: createUUID(),
      }));
      if (history.length >= 1) {
        dispatch(initHistory({ history }));
      }
      setUncompletedList(history);
    } else {
      // after added events
      const history_1 = events.map((v) => ({
        ...v,
        date: todayDate,
        isCompleted: false,
        history_uid: createUUID(),
      }));
      const history = history_1[events.length - 1];
      dispatch(addHistory({ history }));
      const today_history_notCompleted = histories.filter(
        (item) => item.isCompleted == false
      );
      today_history_notCompleted.splice(
        today_history_notCompleted.length - 1,
        0,
        history
      );
      setUncompletedList(today_history_notCompleted);
    }
  }, [events]);

  React.useEffect(() => {
    //edited completedlist
    const today_history_Completed = histories.filter(
      (item) => item.isCompleted == true
    );
    setCompletedList(today_history_Completed);
  }, [uncompletedList]);

  const renderItem = ({ item, index }) => (
    <Swipeable
      style={{ margin: 8 }}
      onLeftActionRelease={() => {
        setVisible(true);
        setIndexforDialog(index);
        setItemforDialog(item.amount);
        setVariation([1, 2, 3]);
      }}
      onRightActionRelease={() => {
        setVisible(true);
        setIndexforDialog(index);
        setItemforDialog(item.amount);
        setVariation([4, 5, 6]);
      }}
      leftContent={
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-end",
            backgroundColor: theme.colors.secondary,
            paddingRight: 12,
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontSize: 18,
            }}
          >
            Just Nice
          </Text>
        </View>
      }
      rightContent={
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
            backgroundColor: theme.colors.primary,
            paddingLeft: 12,
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontSize: 18,
            }}
          >
            Overspent
          </Text>
        </View>
      }
    >
      <View
        style={{
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: 72,
          backgroundColor: theme.colors.primary2,
        }}
      >
        <Text style={styles.text}>
          {item.name} for ${item.amount}
        </Text>
      </View>
    </Swipeable>
  );

  const renderItem_completed = ({ item }) => (
    <Completed_item title={item.name} amount={item.amount} />
  );

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.primary3 }]}
    >
      <ImageBackground
        source={require("../assets/home_background.png")}
        style={styles.image}
      >
        {/*<Icon name='fire' type='font-awesome' color={"red"}*/}
        {/*      onPress={() => navigation.navigate('Profile')}/>*/}

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
            size={36}
            icon={"menu-open"}
            color={theme.colors.accent2}
            onPress={() => {
              navigation.push("Profile");
            }}
          ></IconButton>
        </View>

        <View style={[styles.listContainer, {flex: 2}]}>
          <VirtualizedList
            // here
            data={uncompletedList}
            getItem={getItem}
            getItemCount={getItemCount}
            renderItem={renderItem}
          />
        </View>

        <Text
          style={{ fontSize: 18, color: theme.colors.text, marginVertical: 12 }}
        >
          Completed
        </Text>

        <View style={[styles.listContainer, {flex: 1}]}>
          <FlatList
            data={completedList}
            renderItem={renderItem_completed}
            keyExtractor={(item) => item.title}
          />
        </View>
      </ImageBackground>
      <FAB navigation={navigation}></FAB>
      <MyDialog
        visible={visible}
        hideDialog={hideDialog}
        uncompletedList={uncompletedList}
        item={item_forDialog}
        index={index_forDialog}
        setUncompletedList={setUncompletedList}
        dispatch={dispatch}
        variation={variation}
      ></MyDialog>
    </SafeAreaView>
  );
}

const MyDialog = ({
  visible,
  hideDialog,
  index,
  setUncompletedList,
  uncompletedList,
  item,
  dispatch,
  variation,
}) => {
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Title>How much you vary?</Dialog.Title>
        <Dialog.Actions
          style={{ justifyContent: "space-between", flexDirection: "column" }}
        >
          <Button
            onPress={() => {
              //update local
              let copy = Array.from(uncompletedList);
              copy.splice(index, 1);
              setUncompletedList(copy);

              //update uncompletedList
              let history = [uncompletedList[index]];
              console.log(history);
              dispatch(updateHistory({ history }));
              history = history.map((v) => ({
                ...v,
                isCompleted: true,
                variation: variation[0],
              }));
              history = history[0];
              dispatch(addHistory({ history }));
              hideDialog();
            }}
          >
            {(item * 0.01).toFixed(2)} - {(item * 0.1).toFixed(2)}
          </Button>

          <Button
            onPress={() => {
              //update local
              let copy = Array.from(uncompletedList);
              copy.splice(index, 1);
              setUncompletedList(copy);

              //update uncompletedList
              let history = [uncompletedList[index]];
              console.log(history);
              dispatch(updateHistory({ history }));
              history = history.map((v) => ({
                ...v,
                isCompleted: true,
                variation: variation[1],
              }));
              history = history[0];
              dispatch(addHistory({ history }));
              hideDialog();
            }}
          >
            {(item * 0.11).toFixed(2)} - {(item * 0.2).toFixed(2)}
          </Button>

          <Button
            onPress={() => {
              //update local
              let copy = Array.from(uncompletedList);
              copy.splice(index, 1);
              setUncompletedList(copy);

              //update uncompletedList
              let history = [uncompletedList[index]];
              console.log(history);
              dispatch(updateHistory({ history }));
              history = history.map((v) => ({
                ...v,
                isCompleted: true,
                variation: variation[2],
              }));
              history = history[0];
              dispatch(addHistory({ history }));
              hideDialog();
            }}
          >
            {" "}
            {">"} {(item * 0.21).toFixed(2)}
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

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
  leftSwipeItem: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",
    paddingRight: 20,
  },
  rightSwipeItem: {
    flex: 1,
    justifyContent: "center",
    paddingLeft: 20,
  },
  text: {
    color: "#fff",
    fontSize: 18,
  },
  arrow: {
    padding: 20,
    fontSize: 20,
  },
});
