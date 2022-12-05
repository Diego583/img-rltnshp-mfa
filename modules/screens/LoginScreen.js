import React, { useEffect, useState }from 'react';
import {
  Pressable,
  Image,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight
} from 'react-native';
import { Parse } from "parse/react-native";
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen(props){
    const navigation = useNavigation();
    const [user, setUser] = useState(null);
    const [password, setPassword] = useState(null);
    const [nameError, setNameError] = useState(null);

    useEffect(() =>{
        Parse.User.currentAsync().then(user => {
            if (user === undefined || user === null) { 
              navigation.navigate('LogIn')
            }
        })
      },[])

      alertAnError = (title,message) => {
        Alert.alert(
            title,
            message,
            [
                {text: 'OK', onPress: () => {navigation.navigate('LogIn')}},
            ]
        )
      }

      const onLogin = async() =>{
        if (user === null || password === null ) {
          setNameError(`Favor de llenar los espacios correctamente`);
        } else {
          try {
            let    
              username = (user).trim(),
              passwordT = (password).trim();
            await Parse.User.logIn(username.toString(), passwordT.toString());
            textInput.clear();
            textInput1.clear(); 
            setUser('');
            setPassword('');
            setNameError(null);
            navigation.reset({
              index: 0,
              routes: [{name: 'authenticationSelect'}],
            });
          } catch (error) {                
            setNameError('Usuario o contraseña incorrectos');
            return (error)
          }
        }
      }

      const onLogin2 = async() =>{
        if (user === null || password === null ) {
          setNameError(`Favor de llenar los espacios correctamente`);
        } else {
          try {
            let    
              username = (user).trim(),
              passwordT = (password).trim();
            await Parse.User.logIn(username.toString(), passwordT.toString());
            textInput.clear();
            textInput1.clear(); 
            setUser('');
            setPassword('');
            setNameError(null);
            navigation.reset({
              index: 0,
              routes: [{name: 'Home'}],
            });
          } catch (error) {                
            setNameError('Usuario o contraseña incorrectos');
            return (error)
          }
        }
      }

    /*const onLogin = async() =>{
        navigation.reset({
            index: 0,
            routes: [{name: 'Home'}],
        });
    }*/

    return(
        <View style={styles.container}>
            <View>
              <Text style={{right: 70, top: 8, fontSize: 11}}>Don´t have username and password?</Text>
              <Pressable style={{left: 140, bottom: 10}} onPress={() => navigation.navigate('Create account')}>
                <Text style={styles.loginText}>Create an account</Text>
            </Pressable>
            </View>
            <View style={styles.inputContainer}>
                <TextInput style={styles.inputs}
                keyboardType="email-address"
                placeholder="username"
                value={user}
                ref = {input => {textInput = input}}
                onChangeText={user => setUser(user)}
                />
            </View>
            <View style={styles.inputContainer}>
                <TextInput style={styles.inputs}
                placeholder="password"
                secureTextEntry={true}
                underlineColorAndroid='transparent'
                value={password}
                ref = {input => {textInput1 = input}}
                onChangeText={password => setPassword(password)}
                />
        </View>
        <Text style={{fontWeight: 'bold', top: 45}}>If you have just created an account, enter your username and password and press the blue button below this text.</Text>
        <TouchableHighlight style={[styles.myButtonContainer, styles.loginButton]} onPress={onLogin2}>
          <Text style={styles.loginText2}>Configure 2nd factor of authentication</Text>
        </TouchableHighlight>      
        {!!nameError && (
          <View styles={styles.divError}>
              <Text style={styles.divErrorFont}>{nameError}</Text>
          </View>
        )}
        <Text style={{fontWeight: 'bold', top: 70}}>To authenticate with the already configured second factor press the Authentication button.</Text>
        <TouchableHighlight style={[styles.buttonContainer, styles.galleryButton]} onPress={onLogin}>
          <Text style={styles.galleryText}>AUTHENTICATION</Text>
        </TouchableHighlight>   
          
      </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#FFFFFF",
        padding: 30
    },
    inputContainer: {
        backgroundColor: '#EBEBEB',
        borderRadius: 5,
        height: 50,
        marginBottom: 15,
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
        marginTop:100,
        width: 160,
        borderRadius: 10,
    },
    myButtonContainer: {
        flexDirection: 'row',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:70,
        width: 160,
        borderRadius: 10,
    },
    loginButton: {
        backgroundColor: '#EBEBEB',
        borderBottomColor: '#EBEBEB',
        borderBottomWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        //display: 'none'
    },
    loginText: {
        color: '#2B4066',
        fontWeight: 'bold',
    },
    loginText2: {
      color: '#2B4066',
      fontWeight: 'bold',
      textAlign: 'center'
  },
    galleryText: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center'
    },
    galleryButton: {
      backgroundColor: '#0000ff',
      borderBottomColor: '#0000ff',
      borderBottomWidth: 1,
      justifyContent: 'center',
      alignItems: 'center',
  },
})