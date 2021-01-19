// In App.js in a new project

import * as React from 'react';
import { View, Text, FlatList, ImageBackground, StyleSheet, TouchableOpacity, VirtualizedList } from 'react-native';
import {Dialog, Portal, Button, IconButton} from 'react-native-paper';
import Swipeable from 'react-native-swipeable';
import { useDispatch, useSelector } from "react-redux";
import { addHistory, initHistory, updateHistory } from '../redux/actions';
import { createUUID } from "../utils/index";
import FAB from '../components/fab'

const getItem = (data, index) => {
  return data[index];
};

const getItemCount = (data) => {
  return data.length;
};



const Completed_item = ({ title, amount }) => (
  <View>
    <Text style={styles.completed_text}> {title} for ${amount}</Text>
  </View>
);


export default function HomeScreen({ navigation }) {
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

  // get day and date
  const [today] = React.useState(new Date().getDay());
  const [today_date] = React.useState(new Date().getDate().toString() + (new Date().getMonth() + 1).toString() + new Date().getFullYear().toString())

  // retrieve and filter (events & events)
  const events = useSelector((state) => state.events);
  const today_events = events.filter((item) => item.day == today);
  const histories = useSelector((state) => state.histories);
  const today_history = histories.filter((item) => item.date == today_date);

  React.useEffect(() => {
    if (today_history.length < 1) {
      // initial history
      const history = today_events.map(v => (
        {
          ...v,
          date: today_date,
          isCompleted: false,
          history_uid: createUUID()
        }));
      if (history.length >= 1) { dispatch(initHistory({ history })); }
      setUncompletedList(history)
    } else {
      // after added events
      const history_1 = events.map(v => (
        {
          ...v,
          date: today_date,
          isCompleted: false,
          history_uid: createUUID()
        }));
      const history = history_1[events.length - 1]
      dispatch(addHistory({ history }));
      const today_history_notCompleted = histories.filter((item) => item.isCompleted == false)
      today_history_notCompleted.splice(today_history_notCompleted.length - 1, 0, history)
      setUncompletedList(today_history_notCompleted)
    }
  }, [events]);

  React.useEffect(() => {
    //edited completedlist
    const today_history_Completed = histories.filter((item) => item.isCompleted == true)
    setCompletedList(today_history_Completed)

  }, [uncompletedList]);

  const renderItem = ({ item, index }) => (
    <Swipeable style={{ margin: 8 }}
      rightButtons={[
        <View style={[styles.rightSwipeItem, { backgroundColor: '#72C4A6' }]}>
          <TouchableOpacity onPress={() => {
            setVisible(true)
            setIndexforDialog(index)
            setItemforDialog(item.amount)
            setVariation([1, 2, 3])
          }}>
            <Text style={styles.text}>Just nice</Text>
          </TouchableOpacity>
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
        </View>,

        <View style={[styles.rightSwipeItem, { backgroundColor: '#EF7971' }]}>
          <TouchableOpacity onPress={() => {
            setVisible(true)
            setIndexforDialog(index)
            setItemforDialog(item.amount)
            setVariation([4, 5, 6])
          }}>
            <Text style={styles.text}>Overspent</Text>
          </TouchableOpacity>
        </View>
      ]}
    >
      <View style={[styles.listItem, { backgroundColor: '#F0CFA3' }]}>
        <Text style={[styles.arrow, { color: '#72C4A6' }]}> </Text>
        <Text style={styles.text}>{item.name} for ${item.amount}</Text>
        <Text style={[styles.arrow, { color: '#EF7971' }]}>→</Text>
      </View>
    </Swipeable>
  );

  const renderItem_completed = ({ item }) => (
    <Completed_item
      title={item.name}
      amount={item.amount} />
  );

  return (
    <View style={styles.container}>
      <ImageBackground source={require("../assets/home_background.png")} style={styles.image}>

        {/*<Icon name='fire' type='font-awesome' color={"red"}*/}
        {/*      onPress={() => navigation.navigate('Profile')}/>*/}

        <IconButton
          icon={"menu"}
          style={{ position: 'absolute', top: 35, right: 15, zIndex: 10 }}
          color={"#488B80"}
          onPress={() => {
            navigation.navigate('Profile');
          }}
        ></IconButton>

        <View>
          <Text style={styles.date_text}>Today</Text>

        </View>

        <View style={{ height: '40%' }}>
          <VirtualizedList
            style={{ flex: 1 }}
            keyExtractor={(item, index) => {
              return item[index];
            }}
            // here
            data={uncompletedList}
            getItem={getItem}
            getItemCount={getItemCount}
            renderItem={renderItem}
          />
        </View>

        <View>
          <Text style={{ padding: 10, fontSize: 25, color: '#717171' }}>Completed</Text>
        </View>

        <View>
          <FlatList
            data={completedList}
            renderItem={renderItem_completed}
            keyExtractor={item => item.title}
          />
        </View>

        <FAB></FAB>
      </ImageBackground>
    </View>
  );
}

const MyDialog = ({ visible, hideDialog, index, setUncompletedList, uncompletedList, item, dispatch, variation }) => {
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Title >How much you vary?</Dialog.Title>
        <Dialog.Actions style={{ justifyContent: 'space-between', flexDirection: 'column' }}>
          <Button
            onPress={() => {
              //update local
              let copy = Array.from(uncompletedList);
              copy.splice(index, 1);
              setUncompletedList(copy);

              //update uncompletedList
              let history = [uncompletedList[index]]
              console.log(history)
              dispatch(updateHistory({ history }))
              history = history.map(v => (
                {
                  ...v,
                  isCompleted: true,
                  variation: variation[0]
                }));
              history = history[0]
              dispatch(addHistory({ history }))
              hideDialog();
            }}>{(item * 0.01).toFixed(2)} - {(item * 0.1).toFixed(2)}</Button>

          <Button onPress={() => {
            //update local
            let copy = Array.from(uncompletedList);
            copy.splice(index, 1);
            setUncompletedList(copy);

            //update uncompletedList
            let history = [uncompletedList[index]]
            console.log(history)
            dispatch(updateHistory({ history }))
            history = history.map(v => (
              {
                ...v,
                isCompleted: true,
                variation: variation[1]
              }));
            history = history[0]
            dispatch(addHistory({ history }))
            hideDialog();
          }}>{(item * 0.11).toFixed(2)} - {(item * 0.2).toFixed(2)}</Button>

          <Button onPress={() => {
            //update local
            let copy = Array.from(uncompletedList);
            copy.splice(index, 1);
            setUncompletedList(copy);

            //update uncompletedList
            let history = [uncompletedList[index]]
            console.log(history)
            dispatch(updateHistory({ history }))
            history = history.map(v => (
              {
                ...v,
                isCompleted: true,
                variation: variation[2]
              }));
            history = history[0]
            dispatch(addHistory({ history }))
            hideDialog();
          }}> {'>'} {(item * 0.21).toFixed(2)}</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  )
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    width: '100%',
    height: '100%',
  },
  date_text: {
    fontSize: 50,
    marginTop: 120,
    marginBottom: 50,
    margin: 20,
    color: '#EF7971'
  },
  completed_text: {
    fontSize: 20,
    marginHorizontal: 10,
    padding: 10,
    color: '#EF7971',
    textDecorationLine: 'line-through'
  },
  dialog_button: {
    fontSize: 20,
    margin: 10
  },
  listItem: {
    flexDirection: 'row',
    height: 75,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  leftSwipeItem: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: 20
  },
  rightSwipeItem: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 20
  },
  text: {
    color: '#fff',
    fontSize: 18
  },
  arrow: {
    padding: 20,
    fontSize: 20
  }
});
