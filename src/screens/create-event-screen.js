import React from "react";
import { StyleSheet, View, Image, KeyboardAvoidingView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  TextInput,
  Text,
  Menu,
  Button,
  useTheme,
  IconButton,
  TouchableRipple,
} from "react-native-paper";
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
  const { colors } = useTheme();
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
    <SafeAreaView
      style={{ flex: 1, backgroundColor: colors.primary, padding: 24 }}
    >
      <View
        style={{
          flexGrow: 0,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 12,
        }}
      >
        <IconButton
          icon={"close"}
          style={{ marginLeft: -6 }}
          color={colors.primary2}
          onPress={() => {
            navigation.goBack();
          }}
        ></IconButton>
        <Button
          labelStyle={{ color: colors.accent2 }}
          onPress={() => {
            dispatch(addEvent({ form }));
            navigation.goBack();
          }}
          mode="contained"
          style={{
            backgroundColor: colors.primary2,
            alignSelf: "center",
          }}
        >
          Save
        </Button>
      </View>

      <Text
        style={{
          fontSize: 36,
          color: colors.accent,
          marginBottom: 12,
        }}
      >
        Going to
      </Text>
      <Text
        style={{
          fontSize: 36,
          color: colors.accent,
          marginBottom: 12,
        }}
      >
        spend
      </Text>
      <TextInput
        style={{ marginBottom: 12, marginHorizontal: 24 }}
        label="Amount"
        onChangeText={handleAmount}
        value={form.amount}
      ></TextInput>
      <Text
        style={{
          fontSize: 36,
          color: colors.accent,
          marginBottom: 12,
        }}
      >
        on
      </Text>
      <TextInput
        style={{ marginBottom: 12, marginHorizontal: 24 }}
        name={"name"}
        label="Name"
        onChangeText={handleName}
        value={form.name}
      ></TextInput>
      <TouchableRipple
        icon={"arrow-down"}
        color={colors.primary2}
        style={{ marginBottom: 12 }}
        onPress={() => navigation.navigate("CreateCategory")}
      >
        <Text
          style={{ padding: 24, fontSize: 20, color: "#ffffff", flexGrow: 0 }}
        >
          {form.category || "Category"}
        </Text>
      </TouchableRipple>
      <Text
        style={{
          fontSize: 36,
          color: colors.accent,
          marginBottom: 12,
        }}
      >
        every
      </Text>
      <Menu
        visible={visible}
        onDismiss={handleVisible}
        anchor={
          <TouchableRipple
            style={{ padding: 24 }}
            color={"#ffffff"}
            onPress={handleVisible}
          >
            <Text style={{ fontSize: 20, color: "#ffffff" }}>
              {days[form.day]}
            </Text>
          </TouchableRipple>
        }
      >
        {days.map((el, index) => (
          <Menu.Item
            style={{ textTransform: "capitalize" }}
            title={el}
            key={el}
            onPress={() => handleDay(index)}
          />
        ))}
      </Menu>
      <KeyboardAvoidingView
        style={{
          width: "60%",
          height: "30%",
          position: "absolute",
          bottom: 0,
          right: -2,
        }}
        keyboardVerticalOffset={-500}
      >
        <Image
          style={{
            width: "100%",
            height: "100%",
            resizeMode: "contain",
          }}
          source={require("../assets/pig.png")}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

StyleSheet.create({});
