// In App.js in a new project

import * as React from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity  } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { FloatingAction } from "react-native-floating-action";
import Dialog, { DialogFooter, DialogButton, DialogContent } from 'react-native-popup-dialog';
import Swiper from 'react-native-swiper'

const actions = [

  {
    text: "Create event",
    icon: require("../assets/category_icon.png"),
    name: "CreateEvent",
    color: "#488B80",
    position: 1
  },
  {
    text: "Create goal",
    icon: require("../assets/category_icon.png"),
    name: "create_goal",
    color: "#488B80",
    position: 2
  }
];



export default function HomeScreen({ navigation }) {
  const [visible, setVisible] = React.useState(false);
  return (
    <View style={styles.container}>
      <ImageBackground source={require("../assets/home_background.png")} style={styles.image}>

        <View>
          <Text style={styles.date_text}>Today</Text>
        </View>

        <View style={styles.container_wrap}>
          <Swiper style={styles.wrapper}
            showsButtons={true}
            showsPagination={false}
            prevButton={<Text style={styles.buttonText}>←</Text>}
            nextButton={<Text style={styles.buttonText_next}>→</Text>}>
            <View style={styles.slide1}>
              <Text style={styles.text}>Grocery for $40</Text>
            </View>

            <View style={styles.slide2}>
              <TouchableOpacity onPress={() => {
                setVisible(true);
              }}>
                <Text style={styles.text}>Overspent</Text>
              </TouchableOpacity>
              <Dialog
                visible={visible}
                footer={
                  <DialogFooter >
                    <DialogButton
                      text={<Text style={styles.dialog_button}>$40 - $50</Text>}
                      onPress={() => { }}
                    />
                    <DialogButton
                      text={<Text style={styles.dialog_button}>$50 - $80</Text>}
                      onPress={() => { }}
                    />
                    <DialogButton
                      text={<Text style={styles.dialog_button}> {'> '}$80</Text>}
                      onPress={() => { }}
                    />
                  </DialogFooter>
                }
                onTouchOutside={() => {
                  setVisible(false);
                }}
              >
                <DialogContent>
                  <Text style={styles.dialog_button}>How much you spend on it?</Text>
                </DialogContent>
              </Dialog>
            </View>

            <View style={styles.slide3}>
              <Text style={styles.text}>Just nice</Text>
            </View>
          </Swiper>
        </View>

        <View>
          <Text style={styles.completed_text}>Breakfast for $60</Text>
        </View>

        <FloatingAction
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
  container_wrap: {
    margin: 10,
    height: '10%',
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
    fontFamily: 'Roboto',
    fontSize: 50,
    marginTop: 120,
    marginBottom: 120,
    margin: 20,
    color: '#EF7971'
  },
  completed_text: {
    fontFamily: 'Roboto',
    fontSize: 20,
    margin: 20,
    color: '#EF7971',
    textDecorationLine: 'line-through'
  },
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0CFA3'
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EF7971'
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#488B80'
  },
  text: {
    color: '#fff',
    fontSize: 20,
  },
  buttonText: {
    fontSize: 20,
    color: '#488B80',
    margin: 10
  },
  buttonText_next: {
    fontSize: 20,
    color: '#EF7971',
    margin: 10
  },
  dialog_button: {
    color: '#EF7971',
    fontSize: 20,
    margin: 10
  },
});