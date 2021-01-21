import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Image,
  KeyboardAvoidingView,
  Dimensions,
  ScrollView,
  TouchableHighlight,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Icon } from "react-native-elements";
import {
  TextInput,
  Text,
  Menu,
  Button,
  useTheme,
  IconButton,
  TouchableRipple,
  FAB,
  DataTable,
  Card,
  Paragraph,
  Modal,
  Portal,
  Provider,
} from "react-native-paper";
import { BarChart } from "react-native-chart-kit";
import { useDispatch, useSelector } from "react-redux";
import { createUUID } from "../utils/index";

const userInfo = {
  name: "Lee",
  streak: 120,
  score: 80,
  goal: "A new bicycle",
  goalProgress: 70,
};
//
// let chartData = {
//   labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
//   datasets: [
//     {
//       data: [20, 45, 28, 80, 99, 43, 58]
//     }
//   ]
// };

const expenses = [
  {
    item: "Frozen yogurt",
    amount: "15.9",
  },
  {
    item: "Breakfast",
    amount: "50",
  },
  {
    item: "Lunch",
    amount: "20",
  },
];

export default function ProfileScreen({ route, navigation }) {
  const { colors } = useTheme();

  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  const barSize = () => {
    if (windowWidth < 325) return 0.5;
    return 0.8;
  };
  const config = {
    backgroundGradientFrom: colors.primary3,
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: colors.primary3,
    backgroundGradientToOpacity: 0,
    // color: (opacity = 1) => `rgba(244, 128, 36, ${opacity})`,
    color: (opacity = 1) => colors.secondary,
    strokeWidth: 3, // optional, default 3
    barPercentage: barSize(),
  };
  let chartConfig = config;

  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const [goal, setGoal] = useState(null);

  useEffect(() => {
    chartConfig = config;
  }, []);

  const dispatch = useDispatch();
  const today = useSelector((state) => state.today);
  const histories = useSelector((state) => state.histories);
  const hotSteak = useSelector((state) => state.hotSteak);
  let score = Math.ceil(50 + ((hotSteak / 3) % 15));

  let historyDate = [
    ...new Set(histories.map((context) => context.date)),
  ].slice(0, 7);
  const left = 7 - historyDate.length;
  for (let i = 0; i < left; i++) {
    historyDate.push("-");
  }
  console.log(historyDate);
  // const historyDate = histories.map((context) => {context.date}).slice(0, 7)

  const historyTotalSpent = (historyDate) => {
    let total = [];
    for (let i = 0; i < historyDate.length; i++) {
      let current = 0;
      for (let j = 0; j < histories.length; j++) {
        if (histories[j].date === historyDate[i]) {
          if (context.isOverspent) {
            current += context.amount * (1 + context.spentPercent);
            score -= context.range;
          } else {
            current += context.amount * (1 - context.spentPercent);
            score += context.range;
          }
        }
      }
      total.push(current);
    }
    return total;
  };
  let chartData = {
    labels: historyDate,
    datasets: [
      {
        data: historyTotalSpent(historyDate),
      },
    ],
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: colors.primary2, padding: 24 }}
    >
      <ScrollView style={styles.scrollView}>
        <View style={styles.viewTop}>
          <Text style={styles.text1}>Hi</Text>
          <IconButton
            icon={"close"}
            style={{ marginRight: -6 }}
            size={36}
            color={colors.accent2}
            onPress={() => {
              navigation.goBack();
            }}
          ></IconButton>
        </View>
        <Text style={styles.text2}>{userInfo.name}</Text>
        <Text style={styles.text3}>Take a look at your accomplishment</Text>

        {/*--------streak & score---------------------------------*/}

        <View style={styles.twoCardView}>
          <Card
            style={{
              flex: 1,
              borderRadius: 5,
              backgroundColor: colors.primary,
              marginRight: 5,
            }}
          >
            <Card.Content>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 20, color: colors.primary3 }}>
                  {/*{`${userInfo.streak}`}*/}
                  {hotSteak}
                </Text>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-around",
                    alignItems: "center",
                  }}
                >
                  <View style={{ marginLeft: 10, marginRight: 5 }}>
                    <Text style={{ fontSize: 12, color: colors.primary3 }}>
                      Hot
                    </Text>
                    <Text style={{ fontSize: 12, color: colors.primary3 }}>
                      Streak
                    </Text>
                  </View>
                  <Icon name="fire" type="font-awesome" color={"yellow"} />
                  {/*<Icon name='FireTwoTone' type='antdesign' color={"yellow"}/>*/}
                </View>
              </View>
            </Card.Content>
          </Card>
          <Card
            style={{
              flex: 1,
              borderRadius: 5,
              backgroundColor: colors.secondary,
              marginLeft: 5,
            }}
          >
            <Card.Content>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 20, color: colors.primary3 }}>
                  {/*{`${userInfo.score}%`}*/}
                  {`${score}%`}
                </Text>
                <Text style={{ fontSize: 16, color: colors.primary3 }}>
                  Score
                </Text>
              </View>
            </Card.Content>
          </Card>
        </View>

        {/*-----goal progress------------------------------------*/}

        <Card
          style={{
            borderRadius: 5,
            padding: 5,
            backgroundColor: colors.primary3,
            marginTop: 8,
            marginBottom: 8,
          }}
        >
          <Card.Content>
            <View
              style={{
                flex: 2,
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View style={{ flex: 1, marginRight: 10 }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "bold",
                    color: colors.secondary,
                    textAlign: "left",
                  }}
                >
                  {userInfo.goal}
                </Text>
              </View>

              <View style={{ flex: 1.5 }}>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={progressBarLeft(
                      windowWidth,
                      userInfo,
                      colors.secondary
                    )}
                  ></View>
                  <View
                    style={progressBarRight(
                      windowWidth,
                      userInfo,
                      colors.primary
                    )}
                  ></View>
                </View>
                <Text
                  style={{ fontSize: 12, color: colors.text, marginTop: 10 }}
                >
                  {`You have completed ${userInfo.goalProgress}%. Keep it up!`}
                </Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/*-----chart------------------------------------*/}
        <View
          style={{
            padding: 8,
            borderRadius: 5,
            backgroundColor: colors.primary3,
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                color: colors.secondary,
                margin: 5,
              }}
            >
              {"This Week"}
            </Text>
          </View>
          <BarChart
            style={{
              // paddingLeft: -25,
              paddingTop: 15,
              paddingBottom: 10,
              borderRadius: 5,
              // marginLeft: -5,
              // backgroundColor: colors.primary3,
              backgroundColor: "rgba(10,10,10,0.6)",
            }}
            data={chartData}
            width={windowWidth - windowWidth * 0.3}
            height={220}
            yAxisLabel="$"
            withVerticalLabels
            withHorizontalLabels
            showValuesOnTopOfBars
            fromZero={false}
            withInnerLines={false}
            chartConfig={chartConfig}
            verticalLabelRotation={0}
            // horizontalLabelRotation={-10}
          />
        </View>

        {/*-----expenses table------------------------------------*/}
        <View style={styles.tableView}>
          <DataTable>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  color: colors.text,
                  marginTop: 5,
                }}
              >
                {"Today"}
              </Text>
            </View>
            {/*<DataTable.Pagination*/}
            {/*  page={1}*/}
            {/*  numberOfPages={3}*/}
            {/*  onPageChange={page => {*/}
            {/*    console.log(page);*/}
            {/*  }}*/}
            {/*  label={<Text style={{*/}
            {/*      fontSize: 16, fontWeight: "bold", color: colors.text,*/}
            {/*    }}>{"Today"}</Text>}*/}
            {/*/>*/}

            <DataTable.Header>
              <DataTable.Cell>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "bold",
                    color: colors.text,
                  }}
                >
                  {"Expense Item"}
                </Text>
              </DataTable.Cell>
              <DataTable.Cell numeric>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "bold",
                    color: colors.text,
                  }}
                >
                  {"Budget($)"}
                </Text>
              </DataTable.Cell>
            </DataTable.Header>
            {today.map((expense) => (
              <DataTable.Row>
                <DataTable.Cell style={{ fontSize: 12, color: colors.text }}>
                  {expense.name}
                </DataTable.Cell>
                <DataTable.Cell
                  style={{ fontSize: 12, color: colors.text }}
                  numeric
                >
                  {expense.amount}
                </DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>
        </View>
        <View style={{ marginLeft: 8, marginBottom: 3 }}>
          <Text style={{ fontSize: 12, color: colors.text }}>Version 0.1</Text>
          <Text style={{ fontSize: 12, color: colors.text }}>
            Created by Hello Cannot
          </Text>
        </View>
      </ScrollView>

      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={{
            backgroundColor: "white",
            padding: 20,
            marginHorizontal: 8,
          }}
        >
          <Text
            style={{
              fontSize: 22,
              fontWeight: "bold",
              color: colors.primary,
              marginBottom: 12,
            }}
          >
            {goal ? "Edit Goal" : "Set Goal"}
          </Text>
          <TextInput
            style={{
              marginBottom: 12,
              marginHorizontal: 0,
              color: colors.accent2,
            }}
            placeholderTextColor={colors.accent2}
            underlineColorAndroid={colors.accent2}
            label="Goal"
            // onChangeText={handleAmount}
            // value={form.amount}
          ></TextInput>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <TouchableHighlight>
              <Text
                style={{
                  fontSize: 15,
                  color: colors.accent2,
                  marginRight: 20,
                  fontWeight: "bold",
                }}
                onPress={() => hideModal()}
              >
                CANCEL
              </Text>
            </TouchableHighlight>
            <TouchableHighlight>
              <Text
                style={{
                  fontSize: 15,
                  color: colors.accent2,
                  fontWeight: "bold",
                }}
                onPress={() => console.log()}
              >
                CONFIRM
              </Text>
            </TouchableHighlight>
          </View>
        </Modal>
      </Portal>
      <FAB icon="plus" style={styles.fab} onPress={() => showModal()}></FAB>

      <View
        style={backgroundCircle1(windowWidth, windowHeight, colors.primary)}
      />
      <View style={backgroundCircle2(windowHeight, colors.secondary)} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  viewTop: {
    flexGrow: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text1: {
    fontSize: 30,
    color: "#FFF9F0",
  },
  text2: {
    fontSize: 30,
    color: "#FFF9F0",
    marginBottom: 10,
    fontWeight: "bold",
  },
  text3: {
    fontSize: 16,
    color: "#FFF9F0",
    marginBottom: 10,
  },
  twoCardView: {
    display: "flex",
    flexGrow: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardInnerSplit: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  tableView: {
    marginTop: 10,
    marginBottom: 25,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#FFF9F0",
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: "#488B80",
  },
});

const progressBarLeft = function (windowWidth, userInfo, secondary) {
  return {
    width: (windowWidth / 2) * (userInfo.goalProgress / 100),
    height: 22,
    marginTop: 10,
    backgroundColor: secondary,
    borderRadius: 20,
  };
};

const progressBarRight = function (windowWidth, userInfo, primary) {
  return {
    width: (windowWidth / 2) * ((115 - userInfo.goalProgress) / 100),
    height: 22,
    marginLeft: -20,
    marginTop: 10,
    backgroundColor: primary,
    borderRadius: 20,
    zIndex: -1,
  };
};

const backgroundCircle1 = function (windowWidth, windowHeight, primary) {
  return {
    position: "absolute",
    marginLeft: windowWidth / 1.3,
    marginTop: windowHeight / 6,
    width: 280,
    height: 280,
    borderRadius: 300 / 2,
    backgroundColor: primary,
    zIndex: -10,
  };
};

const backgroundCircle2 = function (windowHeight, secondary) {
  return {
    position: "absolute",
    marginLeft: -50,
    marginTop: windowHeight / 2,
    width: 300,
    height: 300,
    borderRadius: 300 / 2,
    backgroundColor: secondary,
    zIndex: -10,
  };
};
