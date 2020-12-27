import React from "react";
import {StyleSheet, View, Image, KeyboardAvoidingView, Dimensions, ScrollView} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {
  TextInput,
  Text,
  Menu,
  Button,
  useTheme,
  IconButton,
  TouchableRipple,
  FAB,
  ProgressBar,
  DataTable,
  Card,
  Title,
  Paragraph
} from "react-native-paper";
import {
  BarChart,
  ProgressChart,
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
    // labelcolor: (opacity = 1) => `rgba(26, 26, 26, ${opacity})`,
    strokeWidth: 5, // optional, default 3
    barPercentage: 0.8,
    useShadowColorFromDataset: false // optional
  };
  const [form, setForm] = React.useState({
    uid: createUUID(),
    amount: null,
    category: null,
    name: null,
    day: new Date().getDay(),
  });

  React.useEffect(() => {
    if (route.params?.category) {
      setForm({...form, category: route.params.category});
    }
  }, [route.params?.category]);

  const [visible, setVisible] = React.useState(false);
  const dispatch = useDispatch();

  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: colors.primary2, padding: 24}}
    >
      <ScrollView style={styles.scrollView}>
        <View
          style={{
            flexGrow: 0,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 36,
              color: colors.primary3,
            }}
          >
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
        <Text
          style={{
            fontSize: 36,
            color: colors.primary3,
            marginBottom: 10,
            fontWeight: "bold"
          }}
        >
          {userInfo.name}
        </Text>
        <Text
          style={{
            fontSize: 18,
            color: colors.primary3,
            marginBottom: 10,
          }}
        >
          Take a look at your accomplishment
        </Text>

        {/*--------streak & score---------------------------------*/}

        <View
          style={{
            display: "flex",
            flexGrow: 0,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Card
            style={{
              flex: 1,
              borderRadius: 10,
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
                <Text
                  style={{
                    fontSize: 30,
                    color: colors.primary3,
                  }}
                >
                  {`${userInfo.streak}`}
                </Text>
                <Text
                  style={{
                    fontSize: 15,
                    color: colors.primary3,
                  }}
                >
                  Hot Streak
                </Text>
              </View>

            </Card.Content>
          </Card>
          <Card
            style={{
              flex: 1,
              borderRadius: 10,
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
                <Text
                  style={{
                    fontSize: 30,
                    color: colors.primary3,
                  }}
                >
                  {`${userInfo.score}%`}
                </Text>
                <Text
                  style={{
                    fontSize: 20,
                    color: colors.primary3,
                  }}
                >
                  Score
                </Text>
              </View>
            </Card.Content>
          </Card>
        </View>

        {/*-----goal progress------------------------------------*/}

        <Card
          style={{
            borderRadius: 10,
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
              <View
                style={{
                  flex: 1,
                  marginRight: 10
                }}>
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

              <View
                style={{
                  flex: 1.5,
                }}>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      width: 180*(userInfo.goalProgress/100),
                      height: 25,
                      marginTop: 10,
                      backgroundColor: colors.secondary,
                      borderRadius: 20
                  }}></View>
                  <View
                    style={{
                      width: 180*((115-userInfo.goalProgress)/100),
                      height: 25,
                      marginLeft: -20,
                      marginTop: 10,
                      backgroundColor: colors.primary,
                      borderRadius: 20,
                      zIndex: -1
                  }}></View>
                </View>
                {/*<ProgressBar*/}
                {/*  progress={userInfo.goalProgress / 100}*/}
                {/*  color={colors.secondary}*/}
                {/*  style={{*/}
                {/*    height: 15,*/}
                {/*    marginTop: 10,*/}
                {/*    color: colors.secondary,*/}
                {/*    backgrondColor: colors.primary,*/}
                {/*    borderRadius: 20*/}
                {/*  }}*/}
                {/*/>*/}
                <Text
                  style={{
                    fontSize: 13,
                    color: colors.text,
                    marginTop: 10
                  }}
                >
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
              borderRadius: 10,
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
            fromZero
            withInnerLines={false}
            chartConfig={chartConfig}
            verticalLabelRotation={0}
            horizontalLabelRotation={0}
          />
        </View>

        {/*-----expenses table------------------------------------*/}

        <View
          style={{
            marginTop: 10,
            marginBottom: 20,
            padding: 10,
            borderRadius: 10,
            backgroundColor: colors.primary3,
          }}>
          <DataTable>
            <DataTable.Pagination
              page={1}
              numberOfPages={3}
              onPageChange={page => {
                console.log(page);
              }}
              label={<Text
                style={{
                  fontSize: 20, fontWeight: "bold", color: colors.text,
                }}
              >
                {"Today"}
              </Text>}
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
        <View
          style={{
            marginLeft: 8,
            marginBottom: 3,
          }}
        >
          <Text
            style={{
              fontSize: 12,
              color: colors.text,
            }}
          >
            Version 0.1
          </Text>
          <Text
            style={{
              fontSize: 12,
              color: colors.text,
            }}
          >
            Created by Hello Cannot
          </Text>
        </View>

      </ScrollView>

      <FAB icon="plus"
           style={{
             position: 'absolute',
             margin: 16,
             right: 0,
             bottom: 0,
             backgroundColor: colors.accent2
           }}
           onPress={() => console.log()}></FAB>

      <View style={{
        position: 'absolute',
        marginLeft: windowWidth / 1.3,
        marginTop: windowHeight / 6,
        width: 280,
        height: 280,
        borderRadius: 300 / 2,
        backgroundColor: colors.primary,
        zIndex: -10
      }}/>
      <View style={{
        position: 'absolute',
        marginLeft: -50,
        marginTop: windowHeight / 2,
        width: 300,
        height: 300,
        borderRadius: 300 / 2,
        backgroundColor: colors.secondary,
        zIndex: -10
      }}/>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({})
