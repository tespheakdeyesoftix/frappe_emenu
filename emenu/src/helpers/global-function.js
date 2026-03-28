 
import {
	getApi,
	getDoc,
	updateDoc,
	createDoc,
	getDocList,
	postApi,
	getValue,
	deleteDoc,
	getCount,
	setValue,
	uploadFile
} from "@/services/api-service";
import * as utils from "@/helpers/utils.js";

globalThis.app = globalThis.app || {};

globalThis.app.hello = function(){
	alert("Hello World")
}

globalThis.app.utils = utils;

// api url

globalThis.app.getDoc = async function (DocType, DocName) {
	return await getDoc(DocType, DocName);
};

globalThis.app.getValue = async function (DocType, name, fields) {
	return await getValue(DocType, name, fields);
};
globalThis.app.setValue = async function (DocType, name, fields, value) {
	return await setValue(DocType, name, fields, value);
};

globalThis.app.createDoc = async function (DocType, params) {
	return await createDoc(DocType, params);
};

globalThis.app.updateDoc = async function (DocType, name, params) {
	return await updateDoc(DocType, name, params);
};

globalThis.app.deleteDoc = async function (DocType, DocName) {
	return await deleteDoc(DocType, DocName);
};

globalThis.app.getApi = async function (api_url, param) {
	return await getApi(api_url, param);
};
globalThis.app.get = async function (api_url, param) {
	return await getApi(api_url, param);
};


globalThis.app.getCount = async function (DocType, param) {
	return await getCount(DocType, param);
};

globalThis.app.postApi = async function (api_url, param) {
	return await postApi(api_url, param);
};
globalThis.app.post = async function (api_url, param) {
	return await postApi(api_url, param);
};

globalThis.app.getDocList = async function (DocType, param) {
	return await getDocList(DocType, param);
};
 
globalThis.app.uploadFile = async function(
    docType,
    docname,
    fieldname,
    fileData,
    otherOption
){
	return await uploadFile(
    docType,
    docname,
    fieldname,
    fileData,
    otherOption
)
};
 
globalThis.app.showInfo = function (title, message) {
	// window.toast.add({ severity: "info", summary: title, detail: message, life: 3000 });
	alert(message)
};

globalThis.app.showSuccess = function (title, message) {
	// window.toast.add({ severity: "success", summary: title, detail: message, life: 3000 });
	alert(message)
};

globalThis.app.showWarning = function (title, message) {
	
	// window.toast.add({ severity: "warn", summary: title, detail: message, life: 5000 });
	alert(message)
};

 
  