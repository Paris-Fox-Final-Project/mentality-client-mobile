import * as React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import logo from "../../assets/mentality-logo.png";
import { Picker } from "@react-native-picker/picker";

export default function Register() {
  const [name, setName] = React.useState("");
  const [errorName, setErrorName] = React.useState();
  const [email, setEmail] = React.useState("");
  const [errorEmail, setEmailError] = React.useState();
  const [password, setPassword] = React.useState("");
  const [errorPassword, setPasswordError] = React.useState();
  const [gender, setGender] = React.useState("");

  const onButtonRegisterPress = () => {
    if (!name) {
      setErrorName("Kolom nama tidak boleh kosong");
    }

    if (!email) {
      setEmailError("Kolom email tidak boleh kosong");
    }

    if (!password) {
      setPasswordError("Kolom password tidak boleh kosong");
    }
  };
  return (
    <SafeAreaView style={registerSyle.container}>
      <View
        style={{ justifyContent: "center", alignItems: "center", flex: 0.8 }}
      >
        <Image source={logo} style={{ width: 150, height: 150 }} />
      </View>
      <View style={{ flex: 1.2 }}>
        <Text style={registerSyle.title}>Daftar</Text>
        <View style={{ marginBottom: 20 }}>
          <View style={registerSyle.inputContainer}>
            <TextInput
              placeholder="Masukkan Nama Anda"
              style={registerSyle.input}
              placeholderTextColor="white"
              onChangeText={setName}
            />
            <Text style={registerSyle.textError}>{errorName}</Text>
          </View>
          <View style={registerSyle.inputContainer}>
            <TextInput
              placeholder="Masukkan Email"
              style={registerSyle.input}
              placeholderTextColor="white"
              onChangeText={setEmail}
            />
            <Text style={registerSyle.textError}>{errorEmail}</Text>
          </View>
          <View style={registerSyle.inputContainer}>
            <TextInput
              placeholder="Masukkan Password"
              secureTextEntry
              style={registerSyle.input}
              placeholderTextColor="white"
              onChangeText={setPassword}
            />
            <Text style={registerSyle.textError}>{errorPassword}</Text>
          </View>
          <View>
            <Picker>
              <Picker.Item label="Male" value="male" />
              <Picker.Item label="Female" value="female" />
            </Picker>
          </View>
        </View>
        <TouchableOpacity
          style={registerSyle.buttonPrimary}
          onPress={onButtonRegisterPress}
        >
          <Text style={registerSyle.textButtonPrimary}>Daftar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const registerSyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#60A5FA",
    justifyContent: "center",
    paddingHorizontal: 10,
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
    letterSpacing: 2,
  },
});
