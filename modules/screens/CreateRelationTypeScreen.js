import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getDefaultRelationTypes } from '../../utils/client';
import { getRelationTypes } from '../../utils/client';
import { postRelationType } from '../../utils/client';


export default function CreateRelationTypeScreen() {
    const navigation = useNavigation();
    const [relationTypes, setallRelationTypes] = useState([]);
    const [defaultRelationTypes, setallDefaultRelationTypes] = useState([]);
    const [relationTypeName, setrelationTypeName] = useState(null);

    useEffect(() => {
		const data = new Map();
		getDefaultRelationTypes().then(data => setallDefaultRelationTypes(data));
        const data1 = new Map();
		getRelationTypes().then(data1 => setallRelationTypes(data1));
	}, []);

    const onSendRelationType = () => {
		if (relationTypeName != null ) {
            postRelationType(relationTypeName);
            navigation.popToTop();
        } else {
            console.log('no nice');
        }
	}

    return (
        <View style={styles.screenContainer}>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View>
                <View style={{marginHorizontal:30, marginBottom: 10}}>
                    <Text style={{fontWeight:'bold'}}>Instrucciones:</Text>
                    <Text style={{fontWeight:'bold'}}>Aquí crea tipos de relaciones para relacionar tus imagenes si asi lo deseas,
                    ya hay algunos por defecto que te sirven como ejemplo y que puedes utilizar, piensa en algo que relaciona algunas de tus imagenes
                    como mascota, o algun evento, etc.</Text>
                </View>
                    <View style={styles.relationslist}>
                        <Text style={styles.relationTitle}>Tipos de relaciones actuales:</Text>
                        { defaultRelationTypes.map( (defaultRelationType, i) => {
                            return (
                                <Text key={i} style={styles.relationText}>- {defaultRelationType.get('nombre')}</Text>
                            )
                        })}
                        { relationTypes.map( (relationType, i) => {
                            return (
                                <Text key={i} style={styles.relationText}>- {relationType.get('nombre')}</Text>
                            )
                        })}
                        
                    </View>
                    
                    <View style={styles.textInputView}>
                        <TextInput style={styles.textInput}
                            multiline
                            textAlignVertical='top'
                            numberOfLines={1}
                            placeholder="Escribe el nombre de la relación"
                            fontSize={16}
                            value={relationTypeName}
                            onChangeText={relationTypeName => setrelationTypeName(relationTypeName)}
                            on
                        />
                        <View style={styles.buttonMainContainer} >
                            <TouchableOpacity style={[styles.buttonContainer, styles.sendButton]} onPress={() => onSendRelationType()}>
                                <Text style={styles.sendText}>Enviar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>
            </TouchableWithoutFeedback>
        </View>
	);
}       

const styles = StyleSheet.create({
    screenContainer: {
		paddingTop: '15%',
		paddingHorizontal: 20,
		flex: 1
	},
    container:{
        flex: 1
    },
    relationTitle: {
        fontSize: 20, 
        fontWeight: 'bold',
        width: '100%',
        marginBottom: 5
    },
    relationText: {
        fontSize: 18, 
        width: '100%',
        marginHorizontal: 10
    },
    textInputView: {
        marginVertical: 25,
        backgroundColor: 'white',
        borderRadius: 10
    },
    textInput: {
        padding: 10,
        marginTop: 0,
    },
    buttonMainContainer: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'row',
    },
    buttonContainer: {
        flexDirection: 'row',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:20,
        width: 160,
        borderRadius: 10,
    },
    sendButton: {
        backgroundColor: '#EBEBEB',
        borderBottomColor: '#EBEBEB',
        borderBottomWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sendText: {
        color: '#2B4066',
        fontWeight: 'bold'
    },
    relationslist: {
        marginBottom: 20,
        marginHorizontal: 5, 
        flexDirection: 'row',
        flexWrap: "wrap",
    },
    dropdown: {
        backgroundColor: '#EBEBEB',
        bottom: 22, 
        marginLeft: 90,
        width: 170,
        margin: 16,
        height: 45,
        borderRadius: 20,
      },
      placeholderStyle: {
        color: 'gray',
        fontSize: 16,
        paddingLeft: 15
      },
      selectedTextStyle: {
        color: '#2B4066',
        fontWeight: 'bold',
        fontSize: 16,
        paddingLeft: 15
      }
})
