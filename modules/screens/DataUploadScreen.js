import React, { useState, useEffect } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    TextInput, 
    TouchableOpacity, 
    Keyboard, 
    TouchableWithoutFeedback, 
    KeyboardAvoidingView, 
    Dimensions, 
    Image,
    ScrollView,
    FlatList
} from 'react-native';

import * as ImagePicker from 'expo-image-picker';
import Parse from "parse/react-native.js";
import RNRestart from 'react-native-restart';

import { useNavigation } from '@react-navigation/native';
import { uploadImage } from '../../utils/client';
import { getNumUserIMG } from '../../utils/client';

const DeviceWidth = Dimensions.get('window').width

export default function DataUploadScreen() {
    const [image, setImage] = useState(null);
    const [images, setImages] = useState([]);
    const [value, setValue] = useState('');
 
    useEffect(() => {
        setValue('Default Value');
    }, []);

    const navigation = useNavigation();

    useEffect(() => {
		const fetchImages = async () => {
            const userObj = await Parse.User.currentAsync();
			let query = new Parse.Query('Imagen');
			query.equalTo('user', userObj);
			const results = await query.find();
			setImages(results);
		};
		fetchImages();
	}, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          base64: true,
          aspect: [4, 3],
          quality: 1
        });
    
    
        if (!result.cancelled) {
            setImage(result.uri);
            let localUri = result.uri;
            let filename = localUri.split('/').pop();

            const imageFile = new Parse.File(filename, { base64: result.base64 });

            uploadImage(imageFile).then(function () {
                navigation.replace('configuration', null, null);
                alert('IMAGE UPLOADED');
            });
        } else return;

      };

    const createRelationTypeFunction = () => {
        navigation.navigate('createRelationType');
	}

    const establishRelationsFunction = () => {
		navigation.navigate('establishRelations');
	}


    return(
        <View style={styles.screenContainer}>
            <View>
                <View style={{marginHorizontal:30, marginBottom: 10}}>
                    <Text style={{fontWeight:'bold'}}>Instrucciones:</Text>
                    <Text style={{fontWeight:'bold'}}>Sube por lo menos 9 imágenes de tu galería. Sube por lo menos una imágen tuya.
                    Sube imágenes que puedas relacionar entre si o contigo, es decir, familia, amigos, amigos de amigos, mascotas, etc.
                    Posteriormente oprime el botón verde. Y cuando estés listo el botón rojo.</Text>
                </View>
                <View style={styles.buttonsMainContainer}>
                    <View>
                        <TouchableOpacity style={[styles.buttonContainer, styles.galleryButton]} onPress={pickImage}>
                            <Text style={styles.buttonText}>SUBIR IMÁGEN</Text>
                        </TouchableOpacity>
                    </View>
                    <View >
                        {(() => {
                            if (images.length >= 9) {
                                return (
                                <TouchableOpacity style={[styles.buttonContainer, styles.sendButton]} onPress={() => createRelationTypeFunction()}>
                                    <Text style={styles.buttonText}>CREAR TIPO DE RELACION</Text>
                                </TouchableOpacity>)
                            }
                        })()}
                    </View>
                </View>

                <ScrollView style={styles.scrollElement}>
                    <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 20,
                        marginHorizontal: 10,
                    }}>
                        <View style={{
                        flexDirection: 'row',
                        backgroundColor: "grey",
                        flexWrap: "wrap",
                        marginHorizontal: 2,
                        backgroundColor: '#f5f5f5'}}>
                                { images.map( (image, i) => {
                                    return (
                                    <View key={i}>
                                        <Image key={i} style={{width: DeviceWidth*0.25, height: DeviceWidth*0.25, marginHorizontal:5, marginVertical:5}} source={{uri: image.get('imagen').url()}} />
                                    </View>
                                    )
                                })}
                        </View>
                    </View>
                </ScrollView>

                <View>
                    {(() => {
                        if (images.length >= 9) {
                            return (
                            <View style={[styles.nextScreenButtonMainContainer]}>
                                <TouchableOpacity style={[styles.nextScreenButtonContainer, styles.nextScreenButton]} onPress={() => establishRelationsFunction()}>
                                    <Text style={styles.buttonText}>ESTABLECER RELACIONES</Text>
                                </TouchableOpacity>
                            </View>)
                        }
                    })()}
                </View>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    screenContainer: {
		paddingTop: '15%',
		paddingHorizontal: 20,
		flex: 1
	},
    scrollElement: {
        height:350, 
        position:'absolute', 
        top: 205,
        padding: 0,
        marginVertical: 0, 
    },
    buttonsMainContainer: {
        flex: 1,
        justifyContent: 'center',
        marginBottom: 40,
        flexDirection: 'row',
    },
    buttonContainer: {
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        width: 150,
        borderRadius: 10,
        marginHorizontal: 5
    },
    galleryButton: {
        backgroundColor: '#0000ff',
        borderBottomColor: '#0000ff',
        borderBottomWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sendButton: {
        backgroundColor: 'green',
        borderBottomColor: '#EBEBEB',
        borderBottomWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    nextScreenButtonMainContainer: {
        flex: 1,
        justifyContent: 'center',
        marginBottom: 40,
        flexDirection: 'row',
        top: 410
    },
    nextScreenButtonContainer: {
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        width: 250,
        borderRadius: 10,
        marginHorizontal: 5
    },
    nextScreenButton: {
        backgroundColor: 'red',
        borderBottomColor: '#0000ff',
        borderBottomWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})