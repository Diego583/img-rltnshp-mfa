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
          aspect: [2, 1.5],
          maxWidth: 200,
          maxHeight: 200,
          quality: .1,
          
        });
    
    
        if (!result.cancelled) {
            setImage(result.uri);
            let localUri = result.uri;
            let filename = localUri.split('/').pop();
            //console.log(result);

            //const imageFile = new Parse.File(filename, { base64: result.base64 });

            /*uploadImage(imageFile).then(function () {
                navigation.replace('configuration', null, null);
                alert('IMAGE UPLOADED');
            });*/

            //btoa("My file content")

            (async () => {
                const myNewObject = new Parse.Object('Imagen');
                myNewObject.set('imagen', new Parse.File(filename, { base64: result.base64 }));
                myNewObject.set('user', Parse.User.current());
                try {
                  const result = await myNewObject.save();
                  // Access the Parse Object attributes using the .GET method
                  console.log('Imagen created', result);
                } catch (error) {
                  console.error('Error while creating Imagen: ', error);
                }
              })().then(function () {
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
                    <Text style={{fontWeight:'bold'}}>Upload 9 images from your gallery. Upload at least one image of yourself.
                    Upload images that you can relate to each other or to yourself, that is, pictures of family, friends, friends of friends, pets, etc.
                    Then press the green button. And when you're ready press the red button.</Text>
                </View>
                <View style={styles.buttonsMainContainer}>
                    <View>
                        {
                            images.length < 9 ? (
                            <TouchableOpacity style={[styles.buttonContainer, styles.galleryButton]} onPress={pickImage}>
                                <Text style={styles.buttonText}>UPLOAD IMAGE</Text>
                            </TouchableOpacity>) 
                            : 
                            <TouchableOpacity style={[styles.buttonContainer, styles.nextScreenButton]} onPress={() => establishRelationsFunction()}>
                                <Text style={styles.buttonText}>ESTABLISH RELATIONS</Text>
                            </TouchableOpacity>
                        }

                    </View>
                    <View >
                        {(() => {
                            if (images.length >= 9) {
                                return (
                                <TouchableOpacity style={[styles.buttonContainer, styles.sendButton]} onPress={() => createRelationTypeFunction()}>
                                    <Text style={styles.buttonText}>CREATE RELATION TYPE</Text>
                                </TouchableOpacity>
                                )
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
                        <Text style={{color: '#f5f5f5', marginVertical: 15}}>---</Text>
                    </View>
                </ScrollView>

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