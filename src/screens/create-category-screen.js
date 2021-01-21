import React from "react";
import { View, VirtualizedList } from "react-native";
import { List, Text, IconButton, useTheme, Button, Divider } from "react-native-paper";
import { Searchbar } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { addCategory, deleteCategory } from "../redux/actions/index";
import { SafeAreaView } from "react-native-safe-area-context";
import Tries from "../utils/tries";

const getItem = (data, index) => {
  return data[index];
};

const getItemCount = (data) => {
  return data.length;
};

export default function CreateCategoryScreen({ navigation }) {
  const { colors } = useTheme();
  const categories = useSelector((state) => state.categories);
  const tries = React.useMemo(() => new Tries(categories), [categories]);
  const [searchQuery, setSearchQuery] = React.useState("");
  const ref = React.useRef();
  ref.current = tries.search(searchQuery);


  const onChangeSearch = (query) => {
    setSearchQuery(query);
  };

  const categoryDispatch = useDispatch();

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
      </View>

      <Searchbar
        style={{ marginBottom: 24 }}
        placeholder="Search"
        onChangeText={onChangeSearch}
        onSubmitEditing={() => {
          if (!ref.current.length) {
            categoryDispatch(addCategory(searchQuery));
          }
          navigation.navigate("Event", { category: searchQuery });
        }}
        value={searchQuery}
      />
      {ref.current.length ? (
        <VirtualizedList
          keyExtractor={(item) => item}
          ItemSeparatorComponent={() => <Divider></Divider>}
          contentContainerStyle={{borderRadius: 12, backgroundColor: colors.primary3}}
          data={ref.current}
          getItem={getItem}
          getItemCount={getItemCount}
          renderItem={({ item, index }) => (
            <List.Item
              onPress={() =>
                navigation.navigate("Event", { category: item })
              }
              right={() => (
                <IconButton
                  icon={"delete"}
                  color={colors.accent2}
                  onPress={() => {
                    let copy = Array.from(result);
                    copy.splice(index, 1);
                    // Local + global delete
                    setResult(copy);
                    categoryDispatch(deleteCategory(item));
                  }}
                ></IconButton>
              )}
              titleStyle={{
                color: colors.accent2
              }}
              title={item}
            ></List.Item>
          )}
        ></VirtualizedList>
      ) : searchQuery === "" ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text
            style={{
              color: "#fff",
              fontSize: 16,
            }}
          >
            Enter text to add category
          </Text>
        </View>
      ) : (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text
            style={{
              color: "#fff",
              fontSize: 16,
            }}
          >
            Press "Enter" to add categories
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}
