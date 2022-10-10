import Parse from "parse/react-native.js";
import React, { useState, useEffect } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity, 
    Dimensions, 
    Image,
    ScrollView,
    Modal
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { useNavigation } from '@react-navigation/native';

import { getDefaultRelationTypesDropdown } from '../../utils/client';
import { getRelationTypesDropDown } from '../../utils/client';
import { postRelation } from '../../utils/client';
import { getRelations } from '../../utils/client';

const DeviceWidth = Dimensions.get('window').width

export default function EstablishRelationsScreen() {
    const [images, setImages] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [imageIDs, setImageIDS] = useState([{}]);
    const [rt, setRT] = useState(null);
    const [relations, setallRelations] = useState([]);

    const [defaultRelationTypes, setallDefaultRelationTypes] = useState([]);
    const [relationTypes, setallRelationTypes] = useState([]);

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

        const data2 = new Map();
		getRelations().then(data2 => setallRelations(data2));

        const data = new Map();
		getDefaultRelationTypesDropdown().then(data => setallDefaultRelationTypes(data));
        const data1 = new Map();
		getRelationTypesDropDown().then(data1 => setallRelationTypes(data1));
	}, []);

    let imagesIDsarray = [];
    
    const handleOnPress = (num, id) => {
        if (imagesIDsarray.length < 1) {
            imagesIDsarray.push({num, id});
        } else if (imagesIDsarray.length == 1){
            imagesIDsarray.push({num, id});
            setImageIDS(imagesIDsarray);
            setModalVisible(true);
            console.log(imagesIDsarray);
        } else console.log('alv');
    };

    const dropdownData = [];

    for (let i of defaultRelationTypes) {
        dropdownData.push({ label: i[1], value: i[0] })
    };

    for (let i of relationTypes) {
        dropdownData.push({ label: i[1], value: i[0] })
    };

    const onSendRelation = () => {
		if (rt != null) {
            setModalVisible(!modalVisible);
            postRelation(imageIDs[0].id, imageIDs[1].id,  rt).then(function () {
                navigation.replace('establishRelations', null, null);
            });
        } else {
            console.log('no nice');
        }
	};

    const startAuthFunction = () => {
		navigation.navigate('authenticationSelect');
	}

    return(
        <View style={styles.screenContainer}>
            <View>

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
                                    <TouchableOpacity 
                                    onPress={() => handleOnPress(i, image.id)}
                                    key={i}>
                                        <Image style={styles.image} key={i} source={{uri: image.get('imagen').url()}} />
                                        <Text style={styles.imageText}>{image.id[0] + image.id[1] + image.id[2] + image.id[3]}</Text>
                                    </TouchableOpacity>
                                    )
                                })}
                        </View>
                    </View>
                </ScrollView>
                
                <Text style={styles.relationTitle}>Instrucciones:</Text>
                <ScrollView style={styles.relationslist}>
                <Text style={{fontWeight:'bold'}}>Selecciona dos imagenes para establecer una relacion entre ellas. Una vez que se despliegue 
                el modal selecciona el tipo de relación utilizando el dropdown. Oprime Establecer Relacion para confirmar.</Text>
                <Text style={{fontWeight:'bold', color: 'red'}}>Asegurate de establecer por lo menos una relacion para cada imagen.</Text>
                <Text style={{fontWeight:'bold'}}>Una vez hecho esto oprime el botón rojo.</Text>
                </ScrollView>

                <View>
                    <View style={[styles.nextScreenButtonMainContainer]}>
                        <TouchableOpacity style={[styles.nextScreenButtonContainer, styles.nextScreenButton]} onPress={() => startAuthFunction()}>
                            <Text style={styles.buttonText}>AUTENTICACIÓN</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.centeredView}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                        setModalVisible(!modalVisible);
                        }}>
                        <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>Establecer relación entre</Text>
                            {(() => {
                                if (modalVisible) {
                                    return (
                                    <View>
                                        <Text style={styles.modalText}>{'Imagen: ' + (imageIDs[0].id[0] + imageIDs[0].id[1] + imageIDs[0].id[2] + imageIDs[0].id[3])}</Text>
                                        <Text style={styles.modalText}>{'Imagen: ' + (imageIDs[1].id[0] + imageIDs[1].id[1] + imageIDs[1].id[2] + imageIDs[1].id[3])}</Text>
                                    </View>)
                                }
                            })()}

                            <View style={{flexDirection:'row', marginBottom: 35}}>
                                <Text style={[styles.modalText, {top: 12}]}>De tipo: </Text>

                                <Dropdown
                                style={styles.dropdown}
                                placeholderStyle={styles.placeholderStyle}
                                selectedTextStyle={styles.selectedTextStyle}
                                data={dropdownData}
                                maxHeight={150}
                                labelField="label"
                                valueField="value"
                                placeholder="Selección..."
                                value={rt}
                                onChange={rt => {
                                    setRT(rt.label);
                                }}/>
                            </View>

                            <TouchableOpacity
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => onSendRelation()}>
                                <Text style={styles.textStyle}>Establecer relación</Text>
                            </TouchableOpacity>
                        </View>
                        </View>
                    </Modal>
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
        height:405, 
        position:'absolute', 
        padding: 0,
        marginVertical: 0, 
        top: -45
    },
    image: {
        width: DeviceWidth*0.25, 
        height: DeviceWidth*0.25, 
        marginHorizontal:5, 
        marginVertical:5
    },
    imageText: {
        textAlign: 'center'
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 45,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    dropdown: {
        backgroundColor: '#EBEBEB',
        width: 120,
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
    },
    relationslist: {
        marginBottom: 20,
        marginHorizontal: 5, 
        top: 380, 
        height: 150,
        marginHorizontal: 30
    },
    relationTitle: {
        fontSize: 20, 
        fontWeight: 'bold',
        width: '100%',
        marginBottom: 5,
        textAlign: 'center',
        top: 380
    },
    relationText: {
        fontSize: 16, 
        width: '100%',
        marginHorizontal: 10,
        marginVertical: 5
    },
    fillText: {
        fontSize: 16, 
        width: '100%',
        marginHorizontal: 10,
        marginVertical: 5,
        color: '#f5f5f5'
    },
    nextScreenButtonMainContainer: {
        flex: 1,
        justifyContent: 'center',
        marginBottom: 40,
        flexDirection: 'row',
        top: 400
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
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center'
    },
})