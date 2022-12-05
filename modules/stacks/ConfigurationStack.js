import React from 'react';
import DataUploadScreen from '../screens/DataUploadScreen';
import CreateRelationTypeScreen from '../screens/CreateRelationTypeScreen';
import EstablishRelationsScreen from '../screens/EstablishRelationsScreen';
import { createNativeStackNavigator } from "@react-navigation/native-stack";


const ConfigurationStackNavigator = createNativeStackNavigator();

export default function ConfigurationStack(props) {
    return (
        <ConfigurationStackNavigator.Navigator initialRouteName="configuration_main">
            <ConfigurationStackNavigator.Screen 
            name="configuration_main"
            component={DataUploadScreen}
            options={{
                headerShown: false,
            }}/>
            <ConfigurationStackNavigator.Screen 
				name='createRelationType'
				component={CreateRelationTypeScreen}
				options={{
					title: 'Create Relation Type',
					headerBackTitleVisible: true
				}}
			/>
            <ConfigurationStackNavigator.Screen 
				name='establishRelations'
				component={EstablishRelationsScreen}
				options={{
					title: 'Establecer relaciones',
					headerBackTitleVisible: true
				}}
			/>
        </ConfigurationStackNavigator.Navigator>
    )
}

