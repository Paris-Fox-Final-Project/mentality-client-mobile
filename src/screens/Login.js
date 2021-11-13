import * as React from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View, StyleSheet, TextInput, Image, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { loginHandler } from "../store/actions/loginAction";
import logo from "../../assets/mentality-logo.png";
export default function Login({ navigation }) {
  const dispatch = useDispatch();
  const { loading, isLoggedIn, error } = useSelector((state) => state.login);
  const [email, setEmail] = React.useState("");
  const [emailError, setEmailError] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");

  useFocusEffect(
    React.useCallback(() => {
      if (isLoggedIn) {
        navigation.navigate("HomeClient");
      }
    }, [isLoggedIn])
  );

  const handleOnpress = () => {
    if (!email) {
      setEmailError("Kolom email tidak boleh kosong");
    }

    if (!password) {
      setPasswordError("Kolom password tidak boleh kosong");
    }

    if (email && password) {
      setEmailError("");
      setPasswordError("");
      const credential = { email, password };
      dispatch(loginHandler(credential));
    }

    setEmail("");
    setPassword("");
  };

  return (
    <SafeAreaView style={loginStyles.container}>
      <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
        <Image source={logo} style={{ width: 200, height: 200 }} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={loginStyles.title}>Masuk</Text>
        <View style={{ marginBottom: 26 }}>
          <View style={loginStyles.inputContainer}>
            <TextInput
              placeholder="Masukkan email"
              style={loginStyles.input}
              placeholderTextColor="#EFF6FF"
              textContentType="emailAddress"
              value={email}
              onChangeText={setEmail}
            />
            <Text style={loginStyles.textError}>{emailError}</Text>
          </View>
          <View style={loginStyles.inputContainer}>
            <TextInput
              placeholder="Masukkan password"
              style={loginStyles.input}
              textContentType="password"
              secureTextEntry={true}
              placeholderTextColor="#EFF6FF"
              value={password}
              onChangeText={setPassword}
            />
            <Text style={loginStyles.textError}>{passwordError}</Text>
          </View>
        </View>
        <Button
          onPress={handleOnpress}
          title={loading ? "..." : "Masuk"}
          style={loginStyles.buttonPrimary}
          color="#FDB029"
          disabled={loading}
        />
      </View>
    </SafeAreaView>
  );
}

const loginStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#60A5FA",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  title: {
    fontWeight: "bold",
    fontSize: 26,
    color: "#EFF6FF",
    letterSpacing: 1,
    marginBottom: 24,
  },
  inputContainer: {
    marginBottom: 20,
  },
  textError: {
    color: "#EF4444",
    fontSize: 12,
    fontWeight: "400",
  },
  input: {
    paddingVertical: 5,
    borderBottomWidth: 2,
    marginBottom: 4,
    borderBottomColor: "#EFF6FF",
    color: "#EFF6FF",
    fontSize: 16,
    fontWeight: "600",
  },
  buttonPrimary: {
    paddingVertical: 10,
    color: "#1F2937",
  },
});
