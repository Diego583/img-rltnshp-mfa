import React from 'react';
import { View, StyleSheet } from 'react-native';


export function ScreenContainer() {
	return (
		<View style={[defaultStyles.screenContainer]}>
		</View>
	)
}

const defaultStyles = StyleSheet.create({
    screenContainer: {
		paddingTop: '15%',
		paddingHorizontal: 20,
		flex: 1
	}
})