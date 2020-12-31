// In App.js in a new project

import * as React from 'react';
import { View, Text, FlatList, ImageBackground, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { FloatingAction } from "react-native-floating-action";
import Swipeable from 'react-native-swipeable';
import Dialog, { DialogFooter, DialogButton, DialogContent } from 'react-native-popup-dialog';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Breakfast',
    Amount: '40'
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Lunch',
    Amount: '60'
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Dinner',
    Amount: '80'
  },
];

const COMPLETED = [
  {
    title: 'Grocery',
    Amount: '50'
  },
  {
    title: 'Transport',
    Amount: '80'
  },
];

const actions = [

  {
    text: "Create event",
    icon: require("../assets/category_icon.png"),
    name: "CreateEvent",
    color: "#488B80",
    position: 1
  },
  {
    text: "Create category",
    icon: require("../assets/category_icon.png"),
    name: "CreateCategory",
    color: "#488B80",
    position: 2
  }
];

const Completed_item = ({ title, amount }) => (
  <View>
    <Text style={styles.completed_text}> {title} for ${amount}</Text>
  </View>
);

const Item = ({ title, Amount, visible, onPress, onPress1, visible_save, onPress_save, onPress1_save }) => (
  <Swipeable style={{ margin: 8 }}
    rightButtons={[
      <View style={[styles.rightSwipeItem, { backgroundColor: '#72C4A6' }]}>
        <TouchableOpacity onPress={onPress_save}>
          <Text style={styles.text}>Just nice</Text>
        </TouchableOpacity>
        <Dialog
          visible={visible_save}
          footer={
            <DialogFooter >
              <DialogButton
                text={<Text style={[styles.dialog_button, { color: '#72C4A6' }]}>${Amount * 0.05} -${Amount * 0.1}</Text>}
                onPress={() => { }}
              />
              <DialogButton
                text={<Text style={[styles.dialog_button, { color: '#72C4A6' }]}>${Amount * 0.15} -${Amount * 0.2}</Text>}
                onPress={() => { }}
              />
              <DialogButton
                text={<Text style={[styles.dialog_button, { color: '#72C4A6' }]}> {'< '}${Amount * 0.2}</Text>}
                onPress={() => { }}
              />
            </DialogFooter>
          }
          onTouchOutside={onPress1_save}

        >
          <DialogContent>
            <Text style={[styles.dialog_button, { color: '#72C4A6' }]}>How much you save on it?</Text>
          </DialogContent>
        </Dialog>
      </View>,

      <View style={[styles.rightSwipeItem, { backgroundColor: '#EF7971' }]}>
        <TouchableOpacity onPress={onPress}>
          <Text style={styles.text}>Overspent</Text>
        </TouchableOpacity>
        <Dialog
          visible={visible}
          footer={
            <DialogFooter >
              <DialogButton
                text={<Text style={[styles.dialog_button, { color: '#EF7971' }]}>${Amount * 0.05} -${Amount * 0.1}</Text>}
                onPress={() => { }}
              />
              <DialogButton
                text={<Text style={[styles.dialog_button, { color: '#EF7971' }]}>${Amount * 0.15} -${Amount * 0.2}</Text>}
                onPress={() => { }}
              />
              <DialogButton
                text={<Text style={[styles.dialog_button, { color: '#EF7971' }]}> {'> '}${Amount * 0.2}</Text>}
                onPress={() => { }}
              />
            </DialogFooter>
          }
          onTouchOutside={onPress1}

        >
          <DialogContent>
            <Text style={[styles.dialog_button, { color: '#EF7971' }]}>How much you spend on it?</Text>
          </DialogContent>
        </Dialog>
      </View>

    ]}
  >
    <View style={[styles.listItem, { backgroundColor: '#F0CFA3' }]}>
      <Text style={[styles.arrow, { color: '#72C4A6' }]}>←</Text>
      <Text style={styles.text}>{title} for {Amount}</Text>
      <Text style={[styles.arrow, { color: '#EF7971' }]}>→</Text>
    </View>
  </Swipeable>
);



export default function HomeScreen({ navigation }) {

  const [visible, setVisible] = React.useState(false);
  const [visible_save, setVisible_save] = React.useState(false);

  const renderItem = ({ item }) => (
    <Item
      title={item.title}
      Amount={item.Amount}
      visible={visible}
      visible_save={visible_save}
      onPress={() => setVisible(true)}
      onPress1={() => setVisible(false)}
      onPress_save={() => setVisible_save(true)}
      onPress1_save={() => setVisible_save(false)} />
  );

  const renderItem_completed = ({ item }) => (
    <Completed_item
      title={item.title}
      Amount={item.Amount} />
  );

  return (
    <View style={styles.container}>
      <ImageBackground source={require("../assets/home_background.png")} style={styles.image}>

        <View>
          <Text style={styles.date_text}>Today</Text>
        </View>

        <View style={{ height: '40%' }}>
          <FlatList
            style={{ flex: 1 }}
            data={DATA}
            renderItem={renderItem}
          />
        </View>

        <View>
          <Text style = {{padding:10, fontSize:25, color:'#717171'}}>Completed</Text>
        </View>

        <View>
          <FlatList
            data={COMPLETED}
            renderItem={renderItem_completed}
            keyExtractor={item => item.title}
          />
        </View>



        <FloatingAction
          horizontal={true}
          initialNumToRender={3}
          actions={actions}
          color="#488B80"
          onPressItem={name => {
            navigation.navigate(name);
          }}
        />
      </ImageBackground>
    </View>
  );
}




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
    marginHorizontal:10,
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