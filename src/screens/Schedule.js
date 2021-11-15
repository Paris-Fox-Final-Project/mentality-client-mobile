import * as React from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CalendarStrip from "react-native-calendar-strip";

const TIMES = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"];

export default function Schedule() {
  const [time, setTime] = React.useState("10:00");
  const [date, setDate] = React.useState();
  const [session, setSession] = React.useState(1);
  const datesBlackList = (date) => {
    return date.isoWeekday() === 7;
  };

  return (
    <SafeAreaView style={styleSchedule.container}>
      <View
        style={{
          flex: 0.8,
          backgroundColor: "white",
          borderRadius: 10,
          padding: 10,
          borderColor: "gray",
          borderWidth: 1,
        }}
      >
        <Text
          style={{
            marginBottom: 20,
            fontWeight: "bold",
            color: "black",
            fontSize: 16,
            letterSpacing: 0.5,
            textAlign: "center",
          }}
        >
          Tentukan Jadwal
        </Text>
        <CalendarStrip
          highlightDateNameStyle={{
            color: "#FDB029",
          }}
          highlightDateNumberStyle={{
            color: "#FDB029",
          }}
          style={{
            height: 100,
            paddingTop: 10,
            paddingBottom: 10,
            justifyContent: "center",
            backgroundColor: "white",
          }}
          calendarColor={"white"}
          calendarHeaderContainerStyle={{
            marginBottom: 20,
          }}
          calendarHeaderStyle={{
            color: "black",
            marginBottom: 20,
            backgroundColor: "white",
            left: 0,
            position: "absolute",
          }}
          dateNumberStyle={{ color: "black" }}
          dateNameStyle={{ color: "black" }}
          iconContainer={{ flex: 0.1 }}
          onDateSelected={(date) => {
            setDate(date);
          }}
          datesBlacklist={datesBlackList}
          iconContainer={{ alignItems: "center", justifyContent: "center" }}
        />
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            marginTop: 10,
          }}
        >
          {TIMES.map((element, index) => {
            return (
              <TouchableOpacity
                style={{
                  backgroundColor: time === element ? "#FDB029" : "white",
                  borderWidth: 0.8,
                  borderColor: "black",
                  alignSelf: "flex-start",
                  paddingHorizontal: 20,
                  paddingVertical: 4,
                  borderRadius: 8,
                  marginRight: 10,
                  marginBottom: 10,
                }}
                onPress={() => {
                  setTime(element);
                }}
                key={index}
              >
                <Text
                  style={{
                    color: time === element ? "white" : "black",
                    fontWeight: "bold",
                    letterSpacing: 1,
                    fontSize: 16,
                  }}
                >
                  {element}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <View>
          <Text>Durasi Konseling</Text>
          <View>
            <TouchableOpacity
              style={{
                width: 100,
                height: 100,
                borderWidth: 1,
                borderColor: "gray",
                borderRadius: 15,
              }}
            >
              <View
                style={{
                  alignItems: "center",
                  padding: 4,
                }}
              >
                <Text style={{ fontSize: 12 }}>1 Sesi</Text>
                <Text style={{ fontSize: 10 }}>45 - 60 Menit</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={{ flex: 0.4 }}></View>
    </SafeAreaView>
  );
}

const styleSchedule = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 10,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
