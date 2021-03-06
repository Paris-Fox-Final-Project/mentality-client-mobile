import { useFocusEffect } from "@react-navigation/core";
import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Linking,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import userProfile from "../../assets/user.png";
import iconChat from "../../assets/chat.png";
import { getHistoriesCounselingUserLoggedIn } from "../store/actions/historyAction";
import { formatDate } from "../helpers/formatDate";
import { scheduleValidation } from "../helpers/scheduleValidation";
import Loading from "../components/Loading";
export default function History({ navigation }) {
  const dispatch = useDispatch();
  const { histories, isLoading } = useSelector((state) => state.history);

  useFocusEffect(
    React.useCallback(() => {
      dispatch(getHistoriesCounselingUserLoggedIn());
    }, [])
  );
  const renderCounselingList = ({ item }) => {
    const isActive = scheduleValidation(item.schedule);
    return (
      <View
        style={{
          backgroundColor: "white",
          width: 320,
          borderRadius: 20,
          marginBottom: 20,
          paddingBottom: 15,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingTop: 20,
            width: 320,
            paddingBottom: 10,
            paddingRight: 40,
            paddingLeft: 20,
            borderBottomColor: "gray",
            borderBottomWidth: 1,
            marginBottom: 10,
          }}
        >
          <Image
            source={
              item.Counselor.User.avatarUrl
                ? { uri: item.Counselor.User.avatarUrl }
                : userProfile
            }
            style={{
              width: 70,
              height: 70,
              borderRadius: 99,
              marginRight: 10,
            }}
          />
          <View>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 17,
                color: "#222C39",
                marginBottom: 4,
                overflow: "hidden",
                width: 150,
              }}
              numberOfLines={2}
            >
              {item.Counselor.User.name}
            </Text>
            <Text
              numberOfLines={3}
              ellipsizeMode="tail"
              style={{
                width: 180,
                overflow: "hidden",
                color: "#222C39",
                fontSize: 14,
                fontWeight: "400",
                textTransform: "capitalize",
              }}
            >
              {item.Counselor.specialist}
            </Text>
          </View>
        </View>
        <View
          style={{
            paddingHorizontal: 10,
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              backgroundColor: isActive ? "#A7F3D0" : "#F3F4F6",
              alignSelf: "flex-start",
              paddingHorizontal: 12,
              color: isActive ? "#065F46" : "#1F2937",
              borderRadius: 4,
              paddingVertical: 2,
              fontSize: 10,
              fontWeight: "bold",
            }}
          >
            {formatDate(item.schedule)}
          </Text>
          {item.isDone === false ? (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Chat", {
                  roomId: item.orderId,
                });
              }}
            >
              <Image source={iconChat} style={{ width: 20, height: 20 }} />
            </TouchableOpacity>
          ) : null}
          {item.isDone === false && isActive ? (
            <TouchableOpacity
              style={{
                backgroundColor: "#FDB029",
                paddingHorizontal: 6,
                paddingVertical: 2,
                borderRadius: 10,
              }}
              onPress={() => Linking.openURL(item.dailyUrl)}
            >
              <Text
                style={{ fontSize: 12, color: "white", fontWeight: "bold" }}
              >
                Mulai Konseling
              </Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    );
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <SafeAreaView style={historyStyle.container}>
      <FlatList data={histories} renderItem={renderCounselingList} />
    </SafeAreaView>
  );
}

const historyStyle = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
});
