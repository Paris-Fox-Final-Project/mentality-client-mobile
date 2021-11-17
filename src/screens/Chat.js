import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/core";
import { GiftedChat } from "react-native-gifted-chat";
import { useDispatch, useSelector } from "react-redux";
import * as React from "react";
import { View, Text } from "react-native";
import { db } from "../../firebase";
import { getUserLoggedInProfile } from "../store/actions/loginAction";
import Loading from "../components/Loading";
export default function Chat({ route }) {
  const { roomId } = route.params;
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.login);
  const [messages, setMessages] = React.useState([]);
  useFocusEffect(
    React.useCallback(() => {
      dispatch(getUserLoggedInProfile());
    }, [])
  );

  useFocusEffect(
    React.useCallback(() => {
      const unsubscribe = db
        .collection("chats")
        .doc(roomId)
        .collection("messages")
        .orderBy("createdAt", "desc")
        .onSnapshot((snapshot) => {
          let data = snapshot.docs.map((doc) => {
            return {
              _id: doc.data()._id,
              createdAt: doc.data().createdAt.toDate(),
              text: doc.data().text,
              user: doc.data().user,
            };
          });
          console.log(data, ">>>");
          setMessages(data);
        });

      return unsubscribe;
    }, [])
  );

  const onSendMessageHandler = React.useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    console.log(messages);
    const { _id, createdAt, text, user } = messages[0];
    console.log(messages[0]);
    db.collection("chats").doc(roomId).collection("messages").add({
      _id,
      createdAt,
      text,
      user,
    });
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <GiftedChat
      messages={messages}
      onSend={(message) => onSendMessageHandler(message)}
      user={{ _id: user.id, name: user.name, avatar: user.avatarUrl }}
    />
  );
}
