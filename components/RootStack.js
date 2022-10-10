import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";

import LoginStack from '../modules/stacks/LoginStack';
import MainNavigation from './Navigation';


const Stack = createStackNavigator();

export default function RootStack() {
    return(
        <Stack.Navigator>
            <Stack.Screen 
            name="LogIn"
            component={LoginStack}
            options={{
                headerShown: false,
                detachPreviousScreen: false
            }}/>
            <Stack.Screen name="Home"
            component={MainNavigation}
            options={{
                headerShown: false,
                detachPreviousScreen: false
            }}/>
        </Stack.Navigator>
    )
}