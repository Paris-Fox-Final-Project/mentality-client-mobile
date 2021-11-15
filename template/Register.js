import React, {useEffect, useState} from "react";
import { StyleSheet, Text, Picker, TextInput, Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { HandleRegister } from "../store/Actions";
import { useDispatch } from "react-redux";
export default function Register(){
    const dispatch = useDispatch()
    const [registerData, setRegisterData] = useState({
        email: "",
        password: "",
        name: "",
        gender: "",
        avatarUrl: ""
    })
    const changeRegisterHandler = (val, prop) => {
        const state = registerData
        state[prop] = val
        setRegisterData(state)
    }
    const handleRegister = () => {
        // console.log(registerData, 'data register')
        if(registerData.avatarUrl === ""){
            registerData.avatarUrl = null
        }
        // console.log(registerData.avatarUrl)
        const mimetype = 'image/'+registerData.avatarUrl.uri.split('.').pop()
        const filename = registerData.avatarUrl.uri.split('/').pop().split('.')[0]
        const formData = new FormData();
        formData.append('email', registerData.email)
        formData.append('password', registerData.password)
        formData.append('name', registerData.name)
        formData.append('gender', registerData.gender)
        formData.append('avatar_url', {
            uri:  registerData.avatarUrl.uri,
            mimetype,
            filename
        })
        // formData.append('avatar_url', 
        //     registerData.avatarUrl,
        // )
        // console.log(formData, '')
        dispatch(HandleRegister(formData))
        // console.log(registerData.avatarUrl, '||||||||||||')
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,

        });
    
        console.log(result, "ini");
        
        if (!result.cancelled) {
          setRegisterData({
            ...registerData,  
            ["avatarUrl"]: result
            });
        }
      };
    return(
        <>
            <Text>
                Register Page
            </Text>
            <TextInput
                style={styles.inputStyle}
                placeholder="Email"
            // value={this.state.email}
            onChangeText={(val) => changeRegisterHandler(val, 'email')}
            />
            <TextInput
                style={styles.inputStyle}
                placeholder="Password"
                // value={this.state.password}
                onChangeText={(val) => changeRegisterHandler(val, 'password')}
                maxLength={15}
                secureTextEntry={true}
            />
            <TextInput
                style={styles.inputStyle}
                placeholder="Name"
            // value={this.state.email}
            onChangeText={(val) => changeRegisterHandler(val, 'name')}
            />

            <Picker
                // selectedValue={selectedValue}
                style={{ height: 50, width: 150 }}
                onValueChange={(itemValue, itemIndex) => changeRegisterHandler(itemValue, 'gender')}
            >
                <Picker.Item label="Select One" value="" />
                <Picker.Item label="Male" value="male" />
                <Picker.Item label="Female" value="female" />
            </Picker>
            <Button
                color="#3740FE"
                title="Upload Image"
                onPress={pickImage}
            />
            <Button
                color="#3740FE"
                title="Signup"
                onPress={() => handleRegister()}
            />
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: 35,
        backgroundColor: '#fff'
    },
    inputStyle: {
        width: '100%',
        marginBottom: 15,
        paddingBottom: 15,
        alignSelf: "center",
        borderColor: "#ccc",
        borderBottomWidth: 1
    },
    loginText: {
        color: '#3740FE',
        marginTop: 25,
        textAlign: 'center'
    },
    preloader: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    }
});