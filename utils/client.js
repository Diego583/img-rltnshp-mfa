import Parse from "parse/react-native.js";
 
//fXySxIHm6H

const USER_MODEL = Parse.Object.extend("_User");
const IMAGEN_MODEL = Parse.Object.extend("Imagen");
const RELACIONTIPO_MODEL = Parse.Object.extend("RelacionTipo");
const RELACION_MODEL = Parse.Object.extend("Relacion");

export async function uploadImage(file) {
	try{
		const userObj = await Parse.User.currentAsync();

		const imagenObj = new Parse.Object("Imagen");

		imagenObj.set('imagen', file);
		imagenObj.set('user', userObj);
		await imagenObj.save();

		return true;
	} catch (error) {
		alert('ERROR');
		console.log(error);
		return false;
	}
}

export async function getNumUserIMG() {
	const userObj = await Parse.User.currentAsync();

	const imagenQuery = new Parse.Query(IMAGEN_MODEL);
	imagenQuery.equalTo('user', userObj);

	let data = await imagenQuery.find();

	return data.length;
}

export async function getDefaultRelationTypes() {

	const defaultUserQuery = new Parse.Query(USER_MODEL);
	defaultUserQuery.equalTo('objectId', 'fXySxIHm6H');
	let defaultUser = await defaultUserQuery.find();

	const relacionTypeQuery = new Parse.Query(RELACIONTIPO_MODEL);
	relacionTypeQuery.equalTo('user', defaultUser[0]);

	let data = await relacionTypeQuery.find();
	
	return data;
}

export async function getDefaultRelationTypesDropdown() {
	
	const defaultUserQuery = new Parse.Query(USER_MODEL);
	defaultUserQuery.equalTo('objectId', 'fXySxIHm6H');
	let defaultUser = await defaultUserQuery.find();

	const relacionTypeQuery = new Parse.Query(RELACIONTIPO_MODEL);
	relacionTypeQuery.equalTo('user', defaultUser[0]);

	let data = await relacionTypeQuery.find();

	const defaultRelationTypes = new Map();
	
	for (let i of data) {
		defaultRelationTypes.set(i.id, i.get('nombre'));
	};
	return defaultRelationTypes;
}

export async function getRelationTypes() {
    const userObj = await Parse.User.currentAsync();

	const relacionTypeQuery = new Parse.Query(RELACIONTIPO_MODEL);
	relacionTypeQuery.equalTo('user', userObj);

	let data = await relacionTypeQuery.find();

	
	return data;
}

export async function getRelationTypesDropDown() {
    const userObj = await Parse.User.currentAsync();

	const relacionTypeQuery = new Parse.Query(RELACIONTIPO_MODEL);
	relacionTypeQuery.equalTo('user', userObj);

	let data = await relacionTypeQuery.find();

	const relationTypes = new Map();
	
	for (let i of data) {
		relationTypes.set(i.id, i.get('nombre'));
	};
	return relationTypes;
}

export async function postRelationType(relationTypeName) {
	try{
		const userObj = await Parse.User.currentAsync();

		let relacionTypeObj = new Parse.Object('RelacionTipo');
		
		relacionTypeObj.set('nombre', relationTypeName);
		relacionTypeObj.set('user', userObj);

		await relacionTypeObj.save();

		return true;
	}catch(error) {
		console.log(error);
		return false;
	}
}

export async function postRelation(imgID1, imgID2, relType) {
	try {
		
		const userObj = await Parse.User.currentAsync();

		let relacionObj = new Parse.Object('Relacion');

		relacionObj.set('user', userObj);
		relacionObj.set('imagenID1', imgID1);
		relacionObj.set('imagenID2', imgID2);
		relacionObj.set('nombreRelacionTipo', relType);

		await relacionObj.save();

		return true;
	} catch(error) {
		console.log(error);
		return false;
	}
}

export async function getRelations() {
    const userObj = await Parse.User.currentAsync();

	const relacionQuery = new Parse.Query(RELACION_MODEL);
	relacionQuery.equalTo('user', userObj);

	let data = await relacionQuery.find();

	return data;
}