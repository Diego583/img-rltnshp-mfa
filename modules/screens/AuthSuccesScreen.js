import React, {useState} from 'react';
import {
    Alert,
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableHighlight,
    TouchableOpacity
} from 'react-native';

import { Parse } from "parse/react-native";
import { useNavigation } from '@react-navigation/native';
import * as Linking from 'expo-linking';

export default AuthSucces = () => {

    function surveyFunction() {
        Linking.openURL('https://forms.gle/KDC4RiZMh9VjmE4u6');
    }

    return(
    <View style={styles.container}>
        <Text style={styles.textTop}>AUTENTICACIÓN CORRECTA</Text>
        <TouchableOpacity style={[styles.nextScreenButtonContainer, styles.nextScreenButton]} onPress={() => surveyFunction()}>
                <Text style={styles.buttonText}>RESPONDER ENCUESTA</Text>
        </TouchableOpacity>
    </View>  
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: "green",
        padding: 30,
        justifyContent: 'center',
    },
    textTop: {
        color: 'white',
        fontSize: 35, 
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 50
    },
    
    nextScreenButtonContainer: {
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        width: 250,
        borderRadius: 10,
        marginTop: 50
    },
    nextScreenButton: {
        backgroundColor: 'red',
        borderBottomColor: '#0000ff',
        borderBottomWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center'
    },
})
