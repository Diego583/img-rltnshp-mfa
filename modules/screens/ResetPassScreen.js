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

export default UserResetPassword = () => {
    return(
    <View style={styles.container}>
        <Text style={styles.textTop}>Por favor, ingresa tu correo electrónico. Recibirá una liga para recuperar su contraseña</Text>
        <View style={styles.inputContainer}>
            <TextInput style={styles.inputs}
            keyboardType="email-address"
            placeholder="Tu email"
            //value={email}
            //onChangeText={(text) => setEmail(text)}
            />
            </View>
            <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} /*onPress={() => doUserPasswordReset()}*/>
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
