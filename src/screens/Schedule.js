import * as React from "react";
import { StatusBar, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CalendarStrip from "react-native-calendar-strip";
export default function Schedule() {
  const [schedule, setSchedule] = React.useState();

  const datesBlackList = (date) => {
    return date.isoWeekday() === 7;
  };
  return (
    <SafeAreaView style={styleSchedule.container}>
      <View>
        <CalendarStrip
          highlightDateNameStyle={{
            color: "#FDB029",
          }}
          highlightDateNumberStyle={{
            color: "#FDB029",
          }}
          style={{
            height: 100,
            paddingTop: 20,
            paddingBottom: 10,
            justifyContent: "center",
          }}
          calendarColor={"white"}
          calendarHeaderStyle={{
            color: "black",
            alignSelf: "flex-end",
            marginRight: 10,
          }}
          dateNumberStyle={{ color: "black" }}
          dateNameStyle={{ color: "black" }}
          iconContainer={{ flex: 0.1 }}
          onDateSelected={(date) => {
            setSchedule(date);
          }}
          datesBlacklist={datesBlackList}
          iconContainer={{ alignItems: "center", justifyContent: "center" }}
        />
        <Text>{JSON.stringify(schedule)}</Text>
      </View>
    </SafeAreaView>
  );
}

const styleSchedule = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
