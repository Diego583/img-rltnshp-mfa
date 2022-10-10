import React, {useState} from 'react';
import {
    Alert,
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableHighlight
} from 'react-native';

import { Parse } from "parse/react-native";
import { useNavigation } from '@react-navigation/native';
import postUser from '../../utils/client'

export default UserCreateAccount = () => {
    const navigation = useNavigation();
    const [user, setUser] = useState(null);
    const [password, setPassword] = useState(null);
    const [email, setEmail] = useState(null);

    function createUser() {
        console.log(user);
        console.log(password);
        console.log(email);

        if (user != null && password != null && email != null) {
            (async () => {
                const userObj = new Parse.User();

                userObj.set('username', user);
                userObj.set('password', password);
                userObj.set('email', email);

                try {
                    let userResult = await userObj.signUp();
                    console.log('User signed up', userResult);
                } catch (error) {
                    console.error('Error while signing up user', error);
                }
            })().then(navigation.navigate('Login'));
        } else alert('LLENA TODOS LOS CAMPOS');
    }

    return(
    <View style={styles.container}>
        <Text style={styles.textTop}>Por favor, ingresa la siguiente información</Text>
        <View style={styles.inputContainer}>
            <TextInput style={styles.inputs}
                keyboardType="user"
                placeholder="Tu username"
                value={user}
                onChangeText={(user) => setUser(user)}
                />
        </View>
        <View style={styles.inputContainer}>
            <TextInput style={styles.inputs}
                keyboardType="password"
                placeholder="Tu password"
                secureTextEntry={true}
                underlineColorAndroid='transparent'
                value={password}
                onChangeText={(password) => setPassword(password)}
            />
        </View>
        <View style={styles.inputContainer}>
            <TextInput style={styles.inputs}
                keyboardType="email-address"
                placeholder="Tu email"
                value={email}
                onChangeText={(email) => setEmail(email)}
            />
        </View>
        <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => createUser()}>
            <Text style={styles.loginText}>Enviar</Text>
        </TouchableHighlight>  
    </View>  
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: "#FFFFFF",
        padding: 30
    },
    textTop: {
        color: '#3A3A3A'
    },
    inputContainer: {
        backgroundColor: '#EBEBEB',
        borderRadius: 5,
        height: 50,
        marginBottom: 15,
        marginTop: 30,
        flexDirection: 'row'
    },
    inputs:{
        height: 50,
        marginLeft:16,
        flex:1,
    },
    buttonContainer: {
        flexDirection: 'row',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:20,
        width: 160,
        borderRadius: 10,
    },
    loginButton: {
        backgroundColor: '#EBEBEB',
        borderBottomColor: '#EBEBEB',
        borderBottomWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginText: {
        color: '#2B4066',
    }
})
