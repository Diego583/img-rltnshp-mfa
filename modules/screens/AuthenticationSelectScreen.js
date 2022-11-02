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
import { useNavigation } from '@react-navigation/native';
import { Dropdown } from 'react-native-element-dropdown';

import { postRelation } from '../../utils/client';
import { getRelations } from '../../utils/client';
import { getDefaultRelationTypesDropdown } from '../../utils/client';
import { getRelationTypesDropDown } from '../../utils/client';
import { postAutenticacion } from '../../utils/client';
import { postAuthtime } from '../../utils/client';


const DeviceWidth = Dimensions.get('window').width

export default function AuthenticationSelectScreen() {
    const [images, setImages] = useState([]);
    const [imagesVal, setImagesVal] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [imageIDs, setImageIDS] = useState([{}]);
    const [rt, setRT] = useState(null);
    const [relationsVal, setrelationsVal] = useState([]);

    const [selImgVisible, setselImgVisible] = useState(true);
    const [estRelVisible, setestRelVisible] = useState(false);
    const [relations, setallRelations] = useState([]);

    const [defaultRelationTypes, setallDefaultRelationTypes] = useState([]);
    const [relationTypes, setallRelationTypes] = useState([]);


    const navigation = useNavigation();
    let results = [{}];

    var startTime = performance.now();

    useEffect(() => {
        startTime = performance.now();
        /*const fetchRelData = async () => {
            const data2 = new Map();
            getRelations().then(data2 => setallRelations(data2));

            const data = new Map();
            getDefaultRelationTypesDropdown().then(data => setallDefaultRelationTypes(data));
            const data1 = new Map();
            getRelationTypesDropDown().then(data1 => setallRelationTypes(data1));
        };
        fetchRelData();*/

		const fetchImages = async () => {
            const userObj = await Parse.User.currentAsync();
			let query = new Parse.Query('Imagen');
			query.equalTo('user', userObj);
			results = await query.find();

            while (results.length > 4) {
                let randomIndex = Math.floor(Math.random() * (results.length + 1));
                results.splice(randomIndex, 1);
            }

            const defaultUserQuery = new Parse.Query("_User");
            defaultUserQuery.equalTo('objectId', 'fXySxIHm6H');
            let defaultUser = await defaultUserQuery.find();

            let query2 = new Parse.Query('Imagen');
			query2.equalTo('user', defaultUser[0]);
			const results2 = await query2.find();

            while (results2.length > 8) {
                let randomIndex = Math.floor(Math.random() * (results2.length + 1));
                results2.splice(randomIndex, 1);
            }

            for (let i in results) {
                results2.push(results[i]);
            }

            for (var i = results2.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                var temp = results2[i];
                results2[i] = results2[j];
                results2[j] = temp;
            }

            setImagesVal(results);
			setImages(results2);

            const data2 = new Map();
            getRelations().then(data2 => setallRelations(data2));

            const data = new Map();
            getDefaultRelationTypesDropdown().then(data => setallDefaultRelationTypes(data));
            const data1 = new Map();
            getRelationTypesDropDown().then(data1 => setallRelationTypes(data1));
		};
		fetchImages();

        //navigation.replace('authenticationSelect', null, null);

        /*let auxArray = [];
        const fetchRelations = async () => { 
            console.log('all rel: ' + relations.length);
            for (var i = 0; i < imagesVal.length; i++)  {
                for (var j = 0; j < relations.length; j++) {
                    if (imagesVal[i].id == relations[j].get('imagenID1') || imagesVal[i].id == relations[j].get('imagenID2')) {
                        if (!auxArray.includes(relations[j])) auxArray.push(relations[j]);
                    };
                };
            };
            setrelationsVal(auxArray);
        };
        fetchRelations();
        console.log('img rel: ' + auxArray.length);*/
        /*for (var i = 0; i < auxArray.length; i++)  {
            console.log(auxArray[i].get('imagenID1') + ', ' + console.log(auxArray[i].get('nombreRelacionTipo')) + ', ' + console.log(auxArray[i].get('imagenID2')));
        };*/

	}, []);

    function changeSelToEst() {
        setselImgVisible(!selImgVisible);
        setestRelVisible(estRelVisible);
    };

    function setRelData() {
        let auxArray = [];
        let idArray = [];
        console.log('all rel: ' + relations.length);

        for (var i = 0; i < imagesVal.length; i++)  {
            idArray.push(imagesVal[i].id);
        };

        /*for (var i = 0; i < imagesVal.length; i++)  {
            for (var j = 0; j < relations.length; j++) {
                if (imagesVal[i].id == relations[j].get('imagenID1') || imagesVal[i].id == relations[j].get('imagenID2')) {
                    if (!auxArray.includes(relations[j])) auxArray.push(relations[j]);
                };
            };
        };*/
        //console.log(auxArray.length);
        for (var i = 0; i < relations.length; i++)  {
            if (idArray.includes(relations[i].get('imagenID1')) && idArray.includes(relations[i].get('imagenID2'))) {
                console.log(relations[i].get('imagenID1') + ', ' + relations[i].get('imagenID2'));
                if (!auxArray.includes(relations[i])) auxArray.push(relations[i]);
            }
        }
        setrelationsVal(auxArray);
        console.log(idArray);
        console.log(auxArray.length);
        //console.log('img rel: ' + relationsVal.length);
    };


    let imagesArray = [];
    
    const handleOnPress = (image) => {
        if (imagesArray.length < 3) {
            imagesArray.push(image);
        } else if (imagesArray.length == 3){
            imagesArray.push(image);
            //setImageIDS(imagesIDsarray);
            var count = 0;
            //console.log('ia: ' + imagesArray.length + ' iv: ' + imagesVal.length)
            for (var i = 0; i < imagesArray.length; i++)  {
                for (var j = 0; j < imagesVal.length; j++) {
                    if (imagesArray[i].id == imagesVal[j].id) {
                        count++;
                    };
                }
            };

            if (count ==  4) {
                alert('SELECCION CORRECTA');
                //console.log(count);
                imagesArray = [];
                setRelData();
                changeSelToEst();
            } else {
                alert('SELECCION INCORRECTA');
                postAutenticacion('failedInSelection');
                //console.log(count);
                imagesArray = [];
            };
        } else console.log('alv');
    };

    const onSendRelation = () => {
        //console.log('img rel: ' + relationsAuth.length);
		if (rt != null) {
            setModalVisible(!modalVisible);
            console.log(imageIDs[0].id + ",  " + imageIDs[1].id + ",  " + rt);
            console.log('----------------------');
            for (var i = 0; i < relationsVal.length; i++) {
                console.log(relationsVal[i].get('imagenID1') + ",  " + relationsVal[i].get('imagenID2') + ",  " + relationsVal[i].get('nombreRelacionTipo'));
                if (imageIDs[0].id == relationsVal[i].get('imagenID1') && imageIDs[1].id == relationsVal[i].get('imagenID2') &&  rt == relationsVal[i].get('nombreRelacionTipo')) {
                    relationsVal.splice(i, 1);
                } else if (imageIDs[1].id == relationsVal[i].get('imagenID1') && imageIDs[0].id == relationsVal[i].get('imagenID2') &&  rt == relationsVal[i].get('nombreRelacionTipo')) {
                    relationsVal.splice(i, 1);
                } else {
                    navigation.replace('authenticationSelect', null, null);
                    alert('RELACION INCORRECTA');
                    postAutenticacion('failed');
                }
            }
            console.log(relationsVal.length);
        } else {
            console.log('no nice');
        }
	};

    const dropdownData = [];

    for (let i of defaultRelationTypes) {
        dropdownData.push({ label: i[1], value: i[0] })
    };

    for (let i of relationTypes) {
        dropdownData.push({ label: i[1], value: i[0] })
    };

    let imagesIDsarray = [];
    
    const handleOnPressRelation = (num, id) => {
        if (imagesIDsarray.length < 1) {
            imagesIDsarray.push({num, id});
        } else if (imagesIDsarray.length == 1){
            imagesIDsarray.push({num, id});
            setImageIDS(imagesIDsarray);
            setModalVisible(true);
            //console.log(imagesIDsarray);
        } else console.log('alv');
    };

    const AuthFunction = () => {
        console.log(relationsVal.length);
        console.log(relationsVal);
        if (relationsVal.length != 0) {
            navigation.replace('authenticationSelect', null, null);
            alert('AUTENTICACIÓN FALLIDA')
            postAutenticacion('failed');
            var endTime = performance.now()
            var authTime = endTime - startTime;
            postAuthtime(authTime*.01);
        } else {
            var endTime = performance.now()
            var authTime = endTime - startTime;
            postAuthtime(authTime*.01);
            navigation.navigate('authSuccess');
            //alert('AUTENTICACIÓN CORRECTA');
            postAutenticacion('succesful');
        };
	}

    function onCancelSR() {
        setModalVisible(!modalVisible);
    }

    return(
        <View style={styles.screenContainer}>
            <View>

                {
                    selImgVisible ? (
                        <ScrollView style={styles.scrollElement2}>
                            <Text style={{fontWeight:'bold', marginHorizontal:20, bottom: 20, marginTop: 20}}>Del siguiente grupo de imágenes selecciona las 4 que son tuyas
                            y que diste de alta en tu proceso de configuración.</Text>
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
                                            onPress={() => handleOnPress(image)}
                                            key={i}>
                                                <Image style={styles.image} key={i} source={{uri: image.get('imagen').url()}} />
                                                <Text style={styles.imageText}>{i + 1}</Text>
                                            </TouchableOpacity>
                                            )
                                        })}
                                </View>
                                <Text style={{color: '#f5f5f5', marginVertical: 40}}>---</Text>
                            </View>
                        </ScrollView>
                    ) : <View>
                            <View style={styles.scrollElement2}>
                                <Text style={{fontWeight:'bold', marginHorizontal:20, bottom: 20}}>Establece las relaciones que existan entre las 4 imagenes.
                                Una vez que hayas establecido todas las relaciones oprime el botón rojo.</Text>
                                <View style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginHorizontal: 10,
                                    bottom: 70
                                }}>
                                    <View style={{
                                    flexDirection: 'row',
                                    backgroundColor: "grey",
                                    flexWrap: "wrap",
                                    marginHorizontal: 2,
                                    backgroundColor: '#f5f5f5'}}>
                                            { imagesVal.map( (image, i) => {
                                                return (
                                                <TouchableOpacity 
                                                onPress={() => handleOnPressRelation(i, image.id)}
                                                key={i}>
                                                    <Image style={styles.image} key={i} source={{uri: image.get('imagen').url()}} />
                                                    <Text style={styles.imageText}>{i + 1}</Text>
                                                </TouchableOpacity>
                                                )
                                            })}
                                    </View>
                                </View>
                            </View>

                            <View>
                                <View style={[styles.nextScreenButtonMainContainer]}>
                                    <TouchableOpacity style={[styles.nextScreenButtonContainer, styles.nextScreenButton]} onPress={() => AuthFunction()}>
                                        <Text style={styles.buttonText}>AUTENTICAR RELACIONES</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                }

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
                            <TouchableOpacity style={[styles.xbutton, styles.xbuttonClose]} onPress={() => onCancelSR()}>
                                <Text style={styles.textStyle}>X</Text>
                            </TouchableOpacity>
                            <Text style={[styles.modalText, {marginTop: 15}]}>Establecer relación entre</Text>
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
                                <Text style={styles.textStyle}>Confirmar relación</Text>
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
        height:535, 
        position:'absolute', 
        padding: 0,
        marginVertical: 0, 
        top: -45
    },
    scrollElement2: {
        height:600, 
        position:'absolute', 
        padding: 0,
        marginVertical: 0, 
        top: 15
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
        flexDirection: 'row',
        flexWrap: "wrap",
        top: 380, 
        height: 150
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
        top: 450
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
    xbutton: {
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 15,
        elevation: 2,
        marginTop: 0,
        position: 'absolute',
        right: 20,
        top: 15
    },
    xbuttonClose: {
        backgroundColor: 'red',
    },
})