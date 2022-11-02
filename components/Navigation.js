import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DataUploadScreen from '../modules/screens/DataUploadScreen';
import CreateRelationTypeScreen from '../modules/screens/CreateRelationTypeScreen';
import EstablishRelationsScreen from '../modules/screens/EstablishRelationsScreen';
import AuthenticationSelectScreen from '../modules/screens/AuthenticationSelectScreen';
import AuthSuccesScreen from '../modules/screens/AuthSuccesScreen';



import ConfigurationStack from '../modules/stacks/ConfigurationStack';


const NavigationStack = createNativeStackNavigator();

export default MainNavigation = () => {
    return(
        <NavigationStack.Navigator initialRouteName="configuration">
            <NavigationStack.Screen 
            name="configuration"
            component={DataUploadScreen}
            />
            <NavigationStack.Screen 
				name='createRelationType'
				component={CreateRelationTypeScreen}
				options={{
					title: 'Nuevo tipo de relación',
					headerBackTitleVisible: true
				}}
			/>
            <NavigationStack.Screen 
				name='establishRelations'
				component={EstablishRelationsScreen}
				options={{
					title: 'Establecer relaciones',
					headerBackTitleVisible: true
				}}
			/>
			<NavigationStack.Screen 
				name='authenticationSelect'
				component={AuthenticationSelectScreen}
				options={{
					title: 'Autenticación',
					headerBackTitleVisible: false
				}}
			/>
			<NavigationStack.Screen 
				name='authSuccess'
				component={AuthSuccesScreen}
				options={{
					//title: 'Autenticación',
					headerShown: false
				}}
			/>
            
        </NavigationStack.Navigator>
    )
}