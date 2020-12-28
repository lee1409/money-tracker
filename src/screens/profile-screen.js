import React, {useState, useEffect} from "react";
import {StyleSheet, View, Image, KeyboardAvoidingView, Dimensions, ScrollView,
        TouchableHighlight, Alert} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import { Icon } from 'react-native-elements';
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
  Modal, Portal, Provider
} from "react-native-paper";
import {
  BarChart,
} from "react-native-chart-kit";
import {useDispatch} from "react-redux";
import {createUUID} from "../utils/index";

const userInfo = {
  name: "Lee",
  streak: 120,
  score: 80,
  goal: "A new bicycle",
  goalProgress: 70,
}

const data = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  // labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  //          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43]
    }
  ]
};

const expenses = [
  {
    item: "Frozen yogurt",
    amount: "15.9"
  },
  {
    item: "Breakfast",
    amount: "50"
  },
  {
    item: "Lunch",
    amount: "20"
  }
]

export default function ProfileScreen({route, navigation}) {
  const {colors} = useTheme();

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  const chartConfig = {
    backgroundGradientFrom: colors.primary3,
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: colors.primary3,
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => `rgba(244, 128, 36, ${opacity})`,
    // color: (opacity = 1) => `rgba(240, 207, 163, ${opacity})`,
    strokeWidth: 5, // optional, default 3
    barPercentage: 0.8,
  };

  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const [goal, setGoal] = useState(null);

  useEffect(() => {
  }, []);

  const dispatch = useDispatch();


  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: colors.primary2, padding: 24}}
    >
      <ScrollView style={styles.scrollView}>
        <View  style={viewTop()}>
          <Text style={text1(colors.primary3)}>
            Hi
          </Text>
          <IconButton
            icon={"close"}
            style={{marginRight: -6}}
            size={36}
            color={colors.accent2}
            onPress={() => {
              navigation.goBack();
            }}
          ></IconButton>
        </View>
        <Text style={text2(colors.primary3)}>
          {userInfo.name}
        </Text>
        <Text style={text3(colors.primary3)}>
          Take a look at your accomplishment
        </Text>

        {/*--------streak & score---------------------------------*/}

        <View style={twoCardView()}>
          <Card
            style={{
              flex: 1,
              borderRadius: 5,
              backgroundColor: colors.primary,
              marginRight: 5
            }}>
            <Card.Content>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
              >
                <Text style={{fontSize: 30, color: colors.primary3,}}>
                  {`${userInfo.streak}`}
                </Text>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-around",
                    alignItems: "center",
                  }}
                >
                  <View style={{marginRight:5}}>
                    <Text style={{fontSize: 15, color: colors.primary3,}}>
                      Hot
                    </Text>
                    <Text style={{fontSize: 15, color: colors.primary3,}}>
                      Streak
                    </Text>
                  </View>
                  <Icon name='fire' type='font-awesome' color={"yellow"}/>
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
              marginLeft: 5
            }}>
            <Card.Content>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
              >
                <Text style={{fontSize: 30, color: colors.primary3,}}>
                  {`${userInfo.score}%`}
                </Text>
                <Text style={{fontSize: 20, color: colors.primary3,}}>
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
            backgroundColor: colors.primary3,
            marginTop: 10,
            marginBottom: 10
          }}>
          <Card.Content>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <View style={{flex: 1, marginRight: 10}}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    color: colors.secondary,
                    textAlign: 'center'
                  }}
                >
                  {userInfo.goal}
                </Text>
              </View>

              <View style={{flex: 1.5,}}>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <View style={progressBarLeft(userInfo, colors.secondary)}></View>
                  <View style={progressBarRight(userInfo, colors.primary)}></View>
                </View>
                <Text style={{fontSize: 13, color: colors.text, marginTop: 10}}>
                  {`You have completed ${userInfo.goalProgress}%. Keep it up!`}
                </Text>
              </View>
            </View>

          </Card.Content>
        </Card>

        {/*-----chart------------------------------------*/}
        <View>
          <BarChart
            style={{
              paddingTop: 15,
              paddingBottom: 10,
              borderRadius: 5,
              backgroundColor: colors.primary3,
              // backgroundColor: 'rgba(10,10,10,0.7)',
            }}
            data={data}
            width={windowWidth - (windowWidth * 0.2)}
            height={220}
            yAxisLabel="$"
            withVerticalLabels
            withHorizontalLabels
            showValuesOnTopOfBars
            fromZero={false}
            withInnerLines={false}
            chartConfig={chartConfig}
            // verticalLabelRotation={0}
            // horizontalLabelRotation={0}
          />
        </View>

        {/*-----expenses table------------------------------------*/}
        <View
          style={tableView(colors.primary3)}>
          <DataTable>
            <DataTable.Pagination
              page={1}
              numberOfPages={3}
              onPageChange={page => {
                console.log(page);
              }}
              label={<Text style={{
                  fontSize: 20, fontWeight: "bold", color: colors.text,
                }}>{"Today"}</Text>}
            />

            <DataTable.Header>
              <DataTable.Cell>
                <Text
                  style={{
                    fontSize: 18, fontWeight: "bold", color: colors.text,
                  }}
                >
                  {"Expense Item"}
                </Text>
              </DataTable.Cell>
              <DataTable.Cell numeric>
                <Text
                  style={{
                    fontSize: 18, fontWeight: "bold", color: colors.text,
                  }}
                >
                  {"Budget($)"}
                </Text>
              </DataTable.Cell>
            </DataTable.Header>
            {expenses.map((expense) => (
              <DataTable.Row>
                <DataTable.Cell>{expense.item}</DataTable.Cell>
                <DataTable.Cell numeric>{expense.amount}</DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>

        </View>
        <View style={{marginLeft: 8, marginBottom: 3}}>
          <Text style={{fontSize: 12, color: colors.text,}}>
            Version 0.1
          </Text>
          <Text style={{fontSize: 12, color: colors.text,}}>
            Created by Hello Cannot
          </Text>
        </View>

      </ScrollView>

      <Portal>
        <Modal visible={visible} onDismiss={hideModal}
               contentContainerStyle={{backgroundColor: 'white',
                 paddingTop: 20, paddingBottom: 20,
                 marginLeft: 50, marginRight:50,
                 borderRadius:5}}
        >
          <View style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'}}>
            <View>
              <Text
                style={{
                  fontSize: 22,
                  fontWeight: "bold",
                  color: colors.primary,
                  marginBottom: 12,
                }}
              >
                {goal? ("Edit Goal"):("Set Goal")}
              </Text>
              <TextInput
                style={{ marginBottom: 12, marginHorizontal: 0, color:colors.accent2 }}
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
                  marginTop: 10
                }}
              >
                <TouchableHighlight>
                  <Text style={{fontSize: 15, color: colors.accent2, marginRight:20, fontWeight: "bold",}}
                        onPress={()=>hideModal()}>
                    CANCEL
                  </Text>
                </TouchableHighlight>
                <TouchableHighlight>
                  <Text style={{fontSize: 15, color: colors.accent2, fontWeight: "bold",}}
                        onPress={()=>console.log()}>
                    CONFIRM
                  </Text>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </Modal>
      </Portal>
      <FAB icon="plus"
           style={fab(colors.accent2)}
           onPress={() => showModal()}>
      </FAB>
      <View style={backgroundCircle1(windowWidth, windowHeight,colors.primary)} />
      <View style={backgroundCircle2(windowHeight,colors.secondary)} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

})

const viewTop = function() {
  return {
    flexGrow: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  }
}

const text1 = function(primary3) {
  return {
    fontSize: 36,
    color: primary3,
  }
}

const text2 = function(primary3) {
  return {
    fontSize: 36,
    color: primary3,
    marginBottom: 10,
    fontWeight: "bold"
  }
}

const text3 = function(primary3) {
  return {
    fontSize: 18,
    color: primary3,
    marginBottom: 10,
  }
}

const twoCardView = function() {
  return {
    display: "flex",
    flexGrow: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  }
}

const cardInnerSplit = function() {
  return {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  }
}

const progressBarLeft = function(userInfo, secondary) {
  return {
    width: 180*(userInfo.goalProgress/100),
    height: 25,
    marginTop: 10,
    backgroundColor: secondary,
    borderRadius: 20
  }
}

const progressBarRight = function(userInfo, primary) {
  return {
    width: 180*((115-userInfo.goalProgress)/100),
    height: 25,
    marginLeft: -20,
    marginTop: 10,
    backgroundColor: primary,
    borderRadius: 20,
    zIndex: -1
  }
}

const tableView = function(primary3) {
  return {
    marginTop: 10,
    marginBottom: 25,
    padding: 10,
    borderRadius: 5,
    backgroundColor: primary3,
  }
}

const fab = function(accent2) {
  return {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: accent2
  }
}

const backgroundCircle1 = function(windowWidth, windowHeight, primary) {
  return {
    position: 'absolute',
    marginLeft: windowWidth / 1.3,
    marginTop: windowHeight / 6,
    width: 280,
    height: 280,
    borderRadius: 300 / 2,
    backgroundColor: primary,
    zIndex: -10
  }
}

const backgroundCircle2 = function(windowHeight, secondary) {
  return {
    position: 'absolute',
    marginLeft: -50,
    marginTop: windowHeight / 2,
    width: 300,
    height: 300,
    borderRadius: 300 / 2,
    backgroundColor: secondary,
    zIndex: -10
  }
}
