import React from "react";
import { View } from "react-native";
import { TextInput, Text, Menu, Button, Divider } from "react-native-paper";
import {addEvent} from '../redux/actions/index'
import { useDispatch } from "react-redux";

export default function CreateEventScreen() {
  const [text, setText] = React.useState("");

  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);
  const dispatch = useDispatch()


  return (
    <View>
      <Text>Going to</Text>
      <Text>spend</Text>
      <TextInput
        label="Ringgit"
        onChangeText={(text) => setText(text)}
        value={text}
      ></TextInput>
      <Text>on</Text>
      <TextInput
        label="Category"
      ></TextInput>
      <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={<Button onPress={openMenu}>Show menu</Button>}>
          <Menu.Item onPress={() => {}} title="Item 1" />
          <Menu.Item onPress={() => {}} title="Item 2" />
          <Divider />
          <Menu.Item onPress={() => {}} title="Item 3" />
        </Menu>
      <TextInput>Every</TextInput>
      <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={<Button onPress={openMenu}>Show menu</Button>}>
          <Menu.Item onPress={() => {}} title="Item 1" />
          <Menu.Item onPress={() => {}} title="Item 2" />
          <Divider />
          <Menu.Item onPress={() => {}} title="Item 3" />
        </Menu>
        <Button onPress={() => dispatch(addEvent({text: text}))}>Add</Button>
    </View>
  );
}
