import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";


import LogInScreen from '../screens/LoginScreen';
import UserResetPassword from '../screens/ResetPassScreen';
import AuthenticationSelectScreen from '../screens/AuthenticationSelectScreen';
import UserCreateAccount from '../screens/UserCreateAccount';
import AuthSuccesScreen from '../screens/AuthSuccesScreen';

const Stack = createStackNavigator();

export default function LoginStack() {
    return(
        <Stack.Navigator>
            <Stack.Screen name="Login"
            component={LogInScreen}
            options={{
                headerShown: false,
            }}/>
            <Stack.Screen name="Recuperar contraseña"
            component={UserResetPassword}
            options={{
                headerShown: true,
            }}/>
            <Stack.Screen name="Create account"
            component={UserCreateAccount}
            options={{
                headerShown: true,
            }}/>
            <Stack.Screen 
				name='authenticationSelect'
				component={AuthenticationSelectScreen}
				options={{
					title: 'Authentication',
					headerBackTitleVisible: false
				}}
			/>
            <Stack.Screen 
				name='authSuccess'
				component={AuthSuccesScreen}
				options={{
					//title: 'Autenticación',
					headerShown: false
				}}
			/>
        </Stack.Navigator>
    )
}