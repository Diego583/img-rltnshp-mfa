import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import RootStack from './components/RootStack';
import keys from './utils/keys';


import Parse from "parse/react-native.js";
import AsyncStorage from '@react-native-async-storage/async-storage';
Parse.setAsyncStorage(AsyncStorage);
Parse.initialize(keys.applicationId, keys.javascriptKey);
Parse.serverURL = keys.serverURL;


export default function App() {
  return (
   <NavigationContainer>
    <RootStack/>
   </NavigationContainer> 
  );
}
