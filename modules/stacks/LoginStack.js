import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";


import LogInScreen from '../screens/LoginScreen';
import UserResetPassword from '../screens/ResetPassScreen';
import AuthenticationSelectScreen from '../screens/AuthenticationSelectScreen';
import UserCreateAccount from '../screens/UserCreateAccount';

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
            <Stack.Screen name="Crear cuenta"
            component={UserCreateAccount}
            options={{
                headerShown: true,
            }}/>
            <Stack.Screen 
				name='authenticationSelect'
				component={AuthenticationSelectScreen}
				options={{
					title: 'Selecciona las imagenes',
					headerBackTitleVisible: false
				}}
			/>
        </Stack.Navigator>
    )
}