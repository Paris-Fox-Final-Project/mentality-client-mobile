import * as React from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CalendarStrip from "react-native-calendar-strip";
import { Picker } from "@react-native-picker/picker";
import { useFocusEffect } from "@react-navigation/core";
import { useDispatch, useSelector } from "react-redux";
import { getAllTopics } from "../store/actions/topicAction";
import { createNewCounselingHandler, setCreateCounseling } from "../store/actions/counselingAction";
import Midtrans from "./Midtrans";
import formatPrice from "../helpers/formatPrice.js";
const TIMES = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"];

export default function Schedule({ route }) {
  const { counselor } = route.params;
  const dispatch = useDispatch();
  const { topics } = useSelector((state) => state.topic);
  const { createdCounseling, isSuccess, isLoading, error } = useSelector(
    (state) => state.counseling
  );

  const [time, setTime] = React.useState("10:00");
  const [date, setDate] = React.useState();
  const [description, setDescription] = React.useState();
  const [session, setSession] = React.useState(1);
  const [topicId, setTopicId] = React.useState(1);
  const [midtrans, setMidtrans] = React.useState();
  const [errorDate, setErrorDate] = React.useState();

  useFocusEffect(
    React.useCallback(() => {
      dispatch(getAllTopics());
      return () => {
        dispatch(setCreateCounseling(null))
        setMidtrans('')
      } 
    }, [])
  );

  useFocusEffect(
    React.useCallback(() => {
      if (createdCounseling) {
        const { transaction } = createdCounseling;
        setMidtrans(transaction);
      }

      return () => {
        setMidtrans("");
      };
    }, [createdCounseling])
  );

  const onSessionPressHandler = (value) => {
    setSession(value);
    setTime("");
  };

  const onTopicSelected = (itemValue, _) => {
    setTopicId(itemValue);
  };

  const onDateSelected = (date) => {
    const selectedDate = new Date(date).getDate();
    const selectedMonth = new Date(date).getMonth();
    const currentDate = new Date().getDate();
    const currentMonth = new Date().getMonth();
    if (currentMonth === selectedMonth && selectedDate === currentDate) {
      const hours = new Date().getHours();
      if (hours >= 18) {
        setErrorDate("Tidak ada jadwal tersedia");
      }
    } else {
      setErrorDate(false);
    }
    setDate(date);
  };

  const onButtonSubmit = () => {
    const getDate = date.toISOString().split("T")[0];
    const schedule = `${getDate} 22:40:00`;
    // const schedule = `${getDate} ${time}:00`;
    const payload = {
      totalSession: session,
      TopicId: topicId,
      CounselorId: counselor.id,
      schedule,
      description,
    };
    dispatch(createNewCounselingHandler(payload));
  };

  const datesBlackList = (date) => {
    let current = new Date();
    let yesterday = current.setDate(current.getDate() - 1);
    return date.isoWeekday() === 7 || date < yesterday;
  };

  if (midtrans) {
    return <Midtrans uri={midtrans.redirect_url} />;
  }
  return (
    <ScrollView>
      <SafeAreaView style={styleSchedule.container}>
        <View
          style={{
            backgroundColor: "white",
            borderRadius: 10,
            paddingHorizontal: 10,
            marginBottom: 10,
          }}
        >
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
                  {formatPrice(counselor.price)}
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
                  {formatPrice(counselor.price * 2)}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
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
              onDateSelected={onDateSelected}
              datesBlacklist={datesBlackList}
              minDate={new Date()}
              selectedDate={date}
              disabledDateNameStyle={{ color: "gray" }}
              disabledDateNumberStyle={{ color: "gray" }}
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
              {errorDate ? (
                <Text>Tidak ada jadwal tersedia</Text>
              ) : (
                TIMES.map((element, index) => {
                  if ((session === 2) & (index % 2 === 1)) {
                    return null;
                  }
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
                })
              )}
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
              Topik Konseling
            </Text>
            <Picker
              style={{
                marginBottom: 10,
                color: "#FDB029",
                fontWeight: "bold",
              }}
              selectedValue={topicId}
              onValueChange={onTopicSelected}
            >
              {topics.map((topic) => {
                const name =
                  topic.name.charAt(0).toUpperCase() + topic.name.slice(1);
                return (
                  <Picker.Item
                    label={name}
                    value={topic.id}
                    key={`topic-${topic.id}`}
                  />
                );
              })}
            </Picker>
            <View>
              <TextInput
                placeholder="Klik disini untuk menceritakan tentang topik konselingmu"
                multiline={true}
                maxLength={300}
                value={description}
                onChangeText={setDescription}
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
          <View>
            <TouchableOpacity
              style={styleSchedule.buttonPrimary}
              onPress={onButtonSubmit}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="white" size="small" />
              ) : (
                <Text style={styleSchedule.textButtonPrimary}>
                  Jadwalkan Konseling
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const styleSchedule = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 10,
  },
  buttonPrimary: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    backgroundColor: "#FDB029",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#FDB029",
    overflow: "hidden",
    overlayColor: "#FDB029",
  },
  textButtonPrimary: {
    color: "#fff",
    textTransform: "capitalize",
    fontWeight: "700",
    fontSize: 16,
    letterSpacing: 1,
  },
});
