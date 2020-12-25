import React from "react";
import { View } from "react-native";
import { TextInput, Text, Menu, Button } from "react-native-paper";
import { addEvent } from "../redux/actions/index";
import { useDispatch } from "react-redux";
import { createUUID } from "../utils/index";

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export default function CreateEventScreen({ route, navigation }) {
  const [form, setForm] = React.useState({
    uid: createUUID(),
    amount: null,
    category: null,
    name: null,
    day: new Date().getDay(),
  });

  React.useEffect(() => {
    if (route.params?.category) {
      setForm({ ...form, category: route.params.category });
    }
  }, [route.params?.category]);

  const [visible, setVisible] = React.useState(false);
  const dispatch = useDispatch();

  const handleVisible = () => {
    setVisible((prev) => !prev);
  };

  const handleDay = (day) => {
    handleVisible();
    setForm({ ...form, day });
  };

  const handleName = (name) => {
    setForm({ ...form, name });
  };

  const handleAmount = (amount) => {
    setForm({ ...form, amount });
  };

  return (
    <View>
      <Button
        onPress={() => {
          dispatch(addEvent({ form }));
          navigation.goBack();
        }}
      >
        Save
      </Button>
      <Text>Going to</Text>
      <Text>spend</Text>
      <TextInput
        label="Amount"
        onChangeText={handleAmount}
        value={form.amount}
      ></TextInput>
      <Text>on</Text>
      <TextInput
        name={"name"}
        label="Name"
        onChangeText={handleName}
        value={form.name}
      ></TextInput>
      <Button
        icon={"arrow-down"}
        onPress={() => navigation.navigate("CreateCategory")}
      >
        {form.category || "category"}
      </Button>
      <Text>Every</Text>
      <Menu
        visible={visible}
        onDismiss={handleVisible}
        anchor={
          <Button onPress={handleVisible}>{days[form.day] || "Day"}</Button>
        }
      >
        {days.map((el, index) => (
          <Menu.Item title={el} key={el} onPress={() => handleDay(index)} />
        ))}
      </Menu>
    </View>
  );
}
