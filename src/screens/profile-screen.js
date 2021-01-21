import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  ScrollView,
  TouchableHighlight,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Icon } from "react-native-elements";
import {
  TextInput,
  Text,
  useTheme,
  IconButton,
  FAB,
  DataTable,
  Card,
  Modal,
  Portal,
} from "react-native-paper";
import { BarChart } from "react-native-chart-kit";
import { useDispatch, useSelector } from "react-redux";
import {resetGoal, updateGoal} from "../redux/actions";

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
    color: (opacity = 1) => colors.secondary,
    strokeWidth: 3, // optional, default 3
    barPercentage: barSize(),
  };
  let chartConfig = config;

  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const dispatch = useDispatch();
  const today = useSelector((state) => state.today);
  const histories = useSelector((state) => state.histories);
  const hotSteak = useSelector((state) => state.hotSteak);
  const profileGoal_ = useSelector((state) => state.profileGoal);
  let score = Math.ceil(50 + ((hotSteak / 3) % 15));
  const [historyDate, setHistoryDate] = useState([]);
  const [historyTotalSpent, setHistoryTotalSpent] = useState([]);
  const [goalProgress, setGoalProgress] = useState(0);
  const [profileGoal, setProfileGoal] = useState(profileGoal_);

  const handleGoalName = (name) => {
    setProfileGoal({ ...profileGoal, name });
  };

  const handleGoalAmount = (amount) => {
    setProfileGoal({ ...profileGoal, amount });
  };

  const handleUsername = (username) => {
    setProfileGoal({ ...profileGoal, username});
  }

  const goalReset = ()=> {
    setProfileGoal({...profileGoal, date: new Date().toDateString()})
    dispatch(resetGoal(profileGoal));
    hideModal();
  }
  const goalUpdate = ()=> {
    dispatch(updateGoal(profileGoal));
    hideModal();
  }

  const formatGoal = ()=> {
    let goalName = profileGoal.name
    if(goalName.length > 13){
      return goalName.slice(0, 13) + '...'
    }
    return goalName
  }

  useEffect(() => {
    chartConfig = config;

    // Graph Data
    const sortedDec = histories.sort((a, b) => {
      const aDate = new Date(a.date)
      const bDate = new Date(b.date)
      return bDate.getTime() - aDate.getTime()
    })
    let dates = [
      ...new Set(sortedDec.map((context) => {
        let tempDate = new Date(context.date)
        let dd = tempDate.getDate();
        let mm = tempDate.getMonth()+1;
        if(dd<10) dd='0'+dd;
        if(mm<10) mm='0'+mm;
        return dd+'/'+mm
      })),
    ].slice(0, 7);
    const left = 7 - historyDate.length;
    for (let i = 0; i < left; i++) {
      historyDate.push("-");
    }
    setHistoryDate(dates)
    console.log(historyDate);

    let total = [];
    for (let i = 0; i < historyDate.length; i++) {
      let current = 0;
      for (let j = 0; j < histories.length; j++) {
        let context = histories[j]
        if (context.date === historyDate[i] && context.isCompleted) {
          if (context.isOverspent) {
            current += context.amount * (1 + context.spentPercent);
            score -= context.range;
          } else {
            current += context.amount * (1 - (-1*context.spentPercent));
            score += context.range;
          }
        }
      }
      total.push(current);
    }
    setHistoryTotalSpent(total);

    //Goal Progression
    let saved = 0;
    for (let i = 0; i < histories.length; i++) {
      let context = histories[i]
      if (context.date >= profileGoal.date && context.isCompleted) {
        if (context.isOverspent) {
          saved -= context.amount * context.spentPercent;
        } else {
          saved += context.amount * (-1*context.spentPercent);
        }
      }
    }
    for (let i = 0; i < today.length; i++) {
      let context = today[i]
      if (context.date >= profileGoal.date && context.isCompleted) {
        console.log("date: ", profileGoal.date)
        if (context.isOverspent) {
          saved -= context.amount * context.spentPercent;
        } else {
          saved += context.amount * (-1*context.spentPercent);
        }
      }
    }

    if (saved >= profileGoal.amount){
      setGoalProgress(100);
    }else{
      let progress = Math.round((1 - ((profileGoal.amount - saved) / profileGoal.amount)) * 100)
      if(progress < 0){
        setGoalProgress(0)
      }else{
        setGoalProgress(progress)
      }
    }

  }, [, profileGoal]);

  let chartData = {
    labels: historyDate,
    datasets: [
      {
        data: historyTotalSpent,
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
        <Text style={styles.text2}>{profileGoal.username}</Text>
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
              <View style={{ flex: 1, marginRight: 10}}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "bold",
                    color: colors.secondary,
                    textAlign: "center",
                    marginLeft: -25
                  }}
                >
                  {/*{userInfo.goal}*/}
                  {formatGoal()}
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
                      goalProgress
                    )}
                  ></View>
                  <View
                    style={progressBarRight(
                      windowWidth,
                      goalProgress
                    )}
                  ></View>
                </View>
                <Text
                  style={{ fontSize: 12, color: colors.text, marginTop: 10 }}
                >
                  {`You have completed ${goalProgress}%. Keep it up!`}
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
              paddingTop: 15,
              paddingBottom: 10,
              borderRadius: 5,
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
            {"Profile"}
          </Text>
          <TextInput
            style={{
              marginBottom: 12,
              marginHorizontal: 0,
              color: colors.accent2,
            }}
            placeholderTextColor={colors.accent2}
            underlineColorAndroid={colors.accent2}
            label="Username"
            onChangeText={handleUsername}
            value={profileGoal.username}
          ></TextInput>
          <TextInput
            style={{
              marginBottom: 12,
              marginHorizontal: 0,
              color: colors.accent2,
            }}
            placeholderTextColor={colors.accent2}
            underlineColorAndroid={colors.accent2}
            label="Goal"
            onChangeText={handleGoalName}
            value={profileGoal.name}
          ></TextInput>
          <TextInput
            style={{
              marginBottom: 12,
              marginHorizontal: 0,
              color: colors.accent2,
            }}
            placeholderTextColor={colors.accent2}
            underlineColorAndroid={colors.accent2}
            label="Amount"
            onChangeText={handleGoalAmount}
            value={profileGoal.amount}
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
                  marginRight: 20,
                  fontWeight: "bold",
                }}
                onPress={() => goalReset()}
              >
                RESET
              </Text>
            </TouchableHighlight>
            <TouchableHighlight>
              <Text
                style={{
                  fontSize: 15,
                  color: colors.accent2,
                  fontWeight: "bold",
                }}
                onPress={() => goalUpdate()}
              >
                UPDATE
              </Text>
            </TouchableHighlight>
          </View>
        </Modal>
      </Portal>
      <FAB icon="plus" style={styles.fab} onPress={() => showModal()}></FAB>

      <View
        style={backgroundCircle1(windowWidth, windowHeight)}
      />
      <View style={backgroundCircle2(windowHeight)} />
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

const progressBarLeft = function (windowWidth, goalProgress) {
  return {
    width: (windowWidth / 2) * (goalProgress / 100),
    height: 22,
    marginTop: 10,
    backgroundColor: "#72C4A6",
    borderRadius: 20,
  };
};

const progressBarRight = function (windowWidth, goalProgress) {
  return {
    width: (windowWidth / 2) * ((115 - goalProgress) / 100),
    height: 22,
    marginLeft: -20,
    marginTop: 10,
    backgroundColor: goalProgress >= 100 ? ("#72C4A6"):("#EF7971"),
    borderRadius: 20,
    zIndex: -1,
  };
};

const backgroundCircle1 = function (windowWidth, windowHeight) {
  return {
    position: "absolute",
    marginLeft: windowWidth / 1.3,
    marginTop: windowHeight / 6,
    width: 280,
    height: 280,
    borderRadius: 300 / 2,
    backgroundColor: "#EF7971",
    zIndex: -10,
  };
};

const backgroundCircle2 = function (windowHeight) {
  return {
    position: "absolute",
    marginLeft: -50,
    marginTop: windowHeight / 2,
    width: 300,
    height: 300,
    borderRadius: 300 / 2,
    backgroundColor: "#72C4A6",
    zIndex: -10,
  };
};
