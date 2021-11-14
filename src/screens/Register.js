import * as React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Pressable,
  Platform,
  ImageBackground,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import user from "../../assets/user.png";
import { Picker } from "@react-native-picker/picker";
import { useDispatch, useSelector } from "react-redux";
import {
  registerHandler,
  setRegisterError,
  setRegisterSuccess,
} from "../store/actions/registerAction";
import { useFocusEffect } from "@react-navigation/core";
import * as ImagePicker from "expo-image-picker";

export default function Register({ navigation }) {
  const dispatch = useDispatch();
  const { isSuccess, isLoading, error } = useSelector(
    (state) => state.register
  );
  const [name, setName] = React.useState("");
  const [errorName, setErrorName] = React.useState();
  const [email, setEmail] = React.useState("");
  const [errorEmail, setEmailError] = React.useState();
  const [password, setPassword] = React.useState("");
  const [errorPassword, setPasswordError] = React.useState();
  const [gender, setGender] = React.useState("male");
  const [avatar, setAvatar] = React.useState();

  useFocusEffect(
    React.useCallback(() => {
      if (isSuccess) {
        navigation.navigate("Login");
      }

      return () => {
        dispatch(setRegisterSuccess(false));
      };
    }, [isSuccess])
  );

  useFocusEffect(
    React.useCallback(() => {
      (async () => {
        if (Platform.OS !== "web") {
          const { status } =
            await ImagePicker.requestMediaLibraryPermissionsAsync();
          if (status !== "granted") {
            alert("Sorry, we need camera roll permissions to make this work!");
          }
        }
      })();

      return () => {
        cleanUp();
      };
    }, [])
  );

  const pickImageHandler = async () => {
    const option = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    };
    const result = await ImagePicker.launchImageLibraryAsync(option);
    if (!result.cancelled) {
      const filename = result.uri.split("/").pop().split(".")[0];
      const mimetype = `${result.type}/${result.uri.split(".").pop()}`;
      const { uri } = result;
      setAvatar({
        name: filename,
        type: mimetype,
        uri,
      });
    }
  };

  const onGenderChangeHandle = (itemValue, _) => {
    setGender(itemValue);
  };

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

    const isValidPayload = email && name && password;
    if (isValidPayload) {
      const form = new FormData();
      form.append("name", name);
      form.append("email", email);
      form.append("password", password);
      form.append("gender", gender);
      if (avatar) {
        form.append("avatar_url", avatar);
      }
      dispatch(registerHandler(form));
    }
  };

  const cleanUp = () => {
    setPasswordError("");
    setEmailError("");
    setErrorName("");
    setName("");
    setPassword("");
    setEmail("");
    setAvatar("");
  };

  return (
    <SafeAreaView style={registerSyle.container}>
      <View
        style={{ alignItems: "center", justifyContent: "center", flex: 0.7 }}
      >
        <Pressable
          style={{
            width: 80,
            height: 80,
            borderWidth: 1,
            borderColor: "gray",
            borderRadius: 99,
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            shadowColor: null,
          }}
          onPress={pickImageHandler}
        >
          <Image
            source={avatar ? { uri: avatar.uri } : user}
            style={{ width: 80, height: 80, borderRadius: 900 }}
          ></Image>
          <View
            style={{
              position: "absolute",
              right: -5,
              bottom: 10,
              width: 20,
              height: 20,
              backgroundColor: "#FDB029",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 99,
            }}
          >
            <Text style={{ fontSize: 12, color: "white" }}>+</Text>
          </View>
        </Pressable>
      </View>
      <View style={{ flex: 1.3 }}>
        <Text style={registerSyle.title}>Daftar</Text>
        {error ? <Text style={registerSyle.textError}>{error}</Text> : null}
        <View style={{ marginTop: 10 }}>
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
          <View style={registerSyle.inputContainer}>
            <Picker
              selectedValue={gender}
              onValueChange={onGenderChangeHandle}
              dropdownIconColor="white"
              style={{
                backgroundColor: "#60A5FA",
                borderRadius: 10,
                borderRadius: 10,
                color: "white",
                borderWidth: 1,
                borderColor: "white",
              }}
            >
              <Picker.Item label="Male" value="male" />
              <Picker.Item label="Female" value="female" />
            </Picker>
          </View>
        </View>
        <TouchableOpacity
          style={registerSyle.buttonPrimary}
          onPress={onButtonRegisterPress}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="white" size="small" />
          ) : (
            <Text style={registerSyle.textButtonPrimary}>Daftar</Text>
          )}
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
    marginBottom: 20,
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
