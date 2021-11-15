import * as React from "react";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CalendarStrip from "react-native-calendar-strip";
import { Picker } from "@react-native-picker/picker";

const TIMES = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"];

export default function Schedule() {
  const [time, setTime] = React.useState("10:00");
  const [date, setDate] = React.useState();
  const [session, setSession] = React.useState(1);

  const onSessionPressHandler = (value) => {
    setSession(value);
  };

  const datesBlackList = (date) => {
    return date.isoWeekday() === 7;
  };

  return (
    <SafeAreaView style={styleSchedule.container}>
      <ScrollView>
        <View
          style={{
            backgroundColor: "white",
            borderRadius: 10,
            paddingVertical: 10,
            paddingHorizontal: 10,
            marginBottom: 10,
          }}
        >
          <View style={{ marginBottom: 20 }}>
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
                fontSize: 14,
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
          </View>
          <View style={{ marginBottom: 20 }}>
            <Text
              style={{
                fontWeight: "bold",
                color: "black",
                fontSize: 14,
                letterSpacing: 1,
                marginBottom: 10,
              }}
            >
              Waktu Konseling
            </Text>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
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
          </View>
          <View style={{ marginBottom: 20 }}>
            <Text
              style={{
                fontWeight: "bold",
                color: "black",
                fontSize: 14,
                letterSpacing: 1,
                marginBottom: 10,
              }}
            >
              Durasi Konseling
            </Text>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                style={{
                  width: 100,
                  height: 100,
                  borderWidth: 1,
                  borderColor: session === 1 ? "#FDB029" : "gray",
                  borderRadius: 15,
                  alignItems: "center",
                  marginRight: 20,
                }}
                onPress={() => onSessionPressHandler(1)}
              >
                <View
                  style={{
                    alignItems: "center",
                    padding: 4,
                    marginBottom: 10,
                  }}
                >
                  <Text style={{ fontSize: 12 }}>1 Sesi</Text>
                  <Text style={{ fontSize: 10 }}>45 - 60 Menit</Text>
                </View>
                <Text style={{ color: "#FDB029", fontWeight: "bold" }}>
                  Rp150.000
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: 100,
                  height: 100,
                  borderWidth: 1,
                  borderColor: session === 2 ? "#FDB029" : "gray",
                  borderRadius: 15,
                  alignItems: "center",
                }}
                onPress={() => onSessionPressHandler(2)}
              >
                <View
                  style={{
                    alignItems: "center",
                    padding: 4,
                    marginBottom: 10,
                  }}
                >
                  <Text style={{ fontSize: 12 }}>2 Sesi</Text>
                  <Text style={{ fontSize: 10 }}>90 - 120 Menit</Text>
                </View>
                <Text style={{ color: "#FDB029", fontWeight: "bold" }}>
                  Rp300.000
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <Text
              style={{
                fontWeight: "bold",
                color: "black",
                fontSize: 14,
                letterSpacing: 1,
                marginBottom: 10,
              }}
            >
              Topik Konseling
            </Text>
            <Picker
              style={{ marginBottom: 10, color: "#FDB029", fontWeight: "bold" }}
            >
              <Picker.Item label="Percintaan" value="percintaan" />
            </Picker>
            <View>
              <TextInput
                placeholder="Klik disini untuk menceritakan tentang topik konselingmu"
                multiline={true}
                maxLength={300}
                style={{
                  height: 150,
                  borderRadius: 10,
                  borderColor: "gray",
                  borderWidth: 1,
                  paddingHorizontal: 10,
                }}
              />
            </View>
          </View>
        </View>
      </ScrollView>
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
