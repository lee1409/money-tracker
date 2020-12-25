import React from "react";
import { View, VirtualizedList } from "react-native";
import { List, Text, IconButton } from "react-native-paper";
import { Searchbar } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { addCategory, deleteCategory } from "../redux/actions/index";
import Tries from "../utils/tries";

const getItem = (data, index) => {
  return data[index];
};

const getItemCount = (data) => {
  return data.length;
};

export default function CreateCategoryScreen({ navigation }) {
  const categories = useSelector((state) => state.categories);
  const tries = React.useMemo(() => new Tries(categories), [categories]);

  const [searchQuery, setSearchQuery] = React.useState("");
  const [result, setResult] = React.useState(categories);

  const onChangeSearch = (query) => {
    setSearchQuery(query);
    setResult(tries.search(query));
  };

  const categoryDispatch = useDispatch();

  return (
    <View>
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        onSubmitEditing={() => {
          if (!result.length) {
            categoryDispatch(addCategory(searchQuery));
            navigation.navigate("CreateEvent", { category: searchQuery });
          }
        }}
        value={searchQuery}
      />
      {result.length ? (
        <VirtualizedList
          keyExtractor={(item, index) => {
            return item[index];
          }}
          data={result}
          getItem={getItem}
          getItemCount={getItemCount}
          renderItem={({ item, index }) => (
            <List.Item
              onPress={() =>
                navigation.navigate("CreateEvent", { category: item })
              }
              right={() => (
                <IconButton
                  icon={"delete"}
                  onPress={() => {
                    let copy = Array.from(result)
                    copy.splice(index, 1)
                    // Local + global delete
                    setResult(copy);
                    categoryDispatch(deleteCategory(item));
                  }}
                ></IconButton>
              )}
              title={item}
            ></List.Item>
          )}
        ></VirtualizedList>
      ) : searchQuery === "" ? (
        <Text>Enter text to add category</Text>
      ) : (
        <Text>Press Enter to add categories</Text>
      )}
    </View>
  );
}
