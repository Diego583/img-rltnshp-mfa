import React from 'react';
import AuthenticationSelectScreen from '../screens/AuthenticationSelectScreen';
import { createNativeStackNavigator } from "@react-navigation/native-stack";


const AuthenticationStackNavigator = createNativeStackNavigator();

export default function AuthenticationStack(props) {
    return (
        <AuthenticationStackNavigator.Navigator initialRouteName="authentication_main">
            <AuthenticationStackNavigator.Screen 
            name="authentication_main"
            component={AuthenticationSelectScreen}
            options={{
                headerShown: false,
            }}/>
            
        </AuthenticationStackNavigator.Navigator>
    )
}

