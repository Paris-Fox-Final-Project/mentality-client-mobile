import * as React from "react";
import { StatusBar } from "expo-status-bar";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { loginHandler } from "../store/Actions/loginAction";
import logo from "../../assets/mentality-logo.png";
import { useFocusEffect } from "@react-navigation/core";
export default function Login({ navigation }) {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.login);
  const [email, setEmail] = React.useState("");
  const [emailError, setEmailError] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");

  React.useEffect(() => {
    clearState();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        clearState();
      };
    }, [])
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
      clearState();
    }
  };

  const clearState = () => {
    setEmail("");
    setPassword("");
    setEmailError("");
    setPasswordError("");
  };

  const handleOnPressRegister = () => {
    navigation.navigate("Register");
  };

  return (
    <SafeAreaView style={loginStyles.container}>
      <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
        <Image source={logo} style={{ width: 150, height: 150 }} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={loginStyles.title}>Masuk</Text>
        {error ? <Text style={loginStyles.textError}>{error}</Text> : null}
        <View style={{ marginBottom: 20 }}>
          <View style={loginStyles.inputContainer}>
            <TextInput
              placeholder="Email"
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
              placeholder="Password"
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
        <TouchableOpacity
          onPress={handleOnpress}
          activeOpacity={0.5}
          style={loginStyles.buttonPrimary}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="white" size="small" />
          ) : (
            <Text style={loginStyles.textButtonPrimary}>masuk</Text>
          )}
        </TouchableOpacity>
        <View style={loginStyles.actionRegisterContainer}>
          <Text style={loginStyles.actionRegisterText}>Belum punya akun?</Text>
          <TouchableOpacity onPress={handleOnPressRegister}>
            <Text style={loginStyles.actionRegisterTextPrimary}>Daftar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const loginStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222C39",
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  title: {
    fontWeight: "bold",
    fontSize: 26,
    color: "#EFF6FF",
    letterSpacing: 1,
    marginBottom: 10,
  },
  inputContainer: {
    marginBottom: 10,
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
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    backgroundColor: "#FDB029",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#FDB029",
    overflow: "hidden",
    overlayColor: "#FDB029",
    marginBottom: 40,
  },
  textButtonPrimary: {
    color: "#fff",
    textTransform: "capitalize",
    fontWeight: "700",
    fontSize: 16,
    letterSpacing: 1,
  },
  actionRegisterContainer: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  actionRegisterText: {
    color: "white",
  },
  actionRegisterTextPrimary: {
    color: "#FDB029",
    fontWeight: "400",
    marginLeft: 4,
    letterSpacing: 1,
  },
});
