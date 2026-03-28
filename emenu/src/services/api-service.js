
import { FrappeApp } from 'frappe-js-sdk';
import { showSuccessMessage, handleErrorMessage } from "@/helpers/error-message.js"
const frappe = new FrappeApp()
const db = frappe.db();
const call = frappe.call();
export function setValue(DocType, name, fields, value = null) {


    if (typeof fields === "string") {
        return db.setValue(DocType, name, fields, value)
            .then(doc => ({ data: doc.message, error: null }))
            .catch(async err => {
                handleErrorMessage(err);
                return { data: null, err };
            });

    } else {
        return db.setValue(DocType, name, fields)
            .then(doc => ({ data: doc.message, error: null }))
            .catch(async err => {
                handleErrorMessage(err);
                return { data: null, err };
            });
    }
}


export function logoutApi() {

    const auth = frappe.auth();
    return auth
        .logout()
        .then(() => true)
        .catch(() => false);
}

export function getDocList(DocType, param = null) {

    return db.getDocList(DocType, param)
        .then(r => ({ data: r, error: null }))
        .catch(error => {
            // handleErrorMessage(error);
            return { data: null, error };
        });
}

export async function getCount(DocType, param = null) {

    const res = await getApi("frappe.desk.reportview.get_count", {
        doctype: DocType,
        filters: param
    })
    return res;

}

export function getApi(api_url, param = null) {
    return call.get(api_url, param)
        .then(r => {
            if (r.message) {
                return { data: r.message, error: null };
            } else {
                return { data: r, error: null };
            }
        })
        .catch(error => {
            handleErrorMessage(error);
            return { data: null, error };
        });
}

export function postApi(api_url, param = null) {

    return call.post(api_url, param)
        .then(r => {
            // if (r._server_messages) {
            //     showSuccessMessage(r._server_messages);
            // }

            return { data: r.message, error: null };
        })
        .catch(error => {
            // handleErrorMessage(error);
            alert("error")
            return { data: null, error };
        });
}

export function getDoc(DocType, DocName) {

    return db.getDoc(DocType, DocName)
        .then(doc => ({ data: doc, error: null }))
        .catch(error => {
            handleErrorMessage(error);
            return { data: null, error };
        });
}

export function getSingleValue(DocType, DocName) {



    return db.getDoc(DocType, DocName)
        .then(doc => ({ data: doc, error: null }))
        .catch(error => {
            handleErrorMessage(error);
            return { data: null, error };
        });
}

export function getValue(DocType, name, fields) {


    return db.getValue(DocType, fields, [["name", "=", name]])
        .then(doc => ({ data: doc.message, error: null }))
        .catch(error => {
            handleErrorMessage(error);
            return { data: null, error };
        });
}

export function createDoc(DocType, params) {


    return db.createDoc(DocType, params)
        .then(doc => ({ data: doc, error: null }))
        .catch(error => {
            handleErrorMessage(error);
            return { data: null, error };
        });
}

export function updateDoc(DocType, name, params) {
    return db.updateDoc(DocType, name, params)
        .then(doc => ({ data: doc, error: null }))
        .catch(error => {
            handleErrorMessage(error);
            return { data: null, error };
        });
}

export function deleteDoc(DocType, DocName) {


    return db.deleteDoc(DocType, DocName)
        .then(msg => ({ data: msg, error: null }))
        .catch(err => {
            handleErrorMessage(err);
            return { data: null, error };
        });
}

export async function uploadFile(
    docType,
    docname,
    fieldname,
    fileData,
    otherOption
) {
    if (!frappe) {
        return { data: null, error: "Frappe is not defined" };
    }

    const file = frappe.file();

    const fileArgs = {
        isPrivate: false,
        folder: "home",
        file_url: otherOption.file_url ?? "",
        doctype: docType,
        docname: docname,
        fieldname: fieldname
    };

    const loading = await app.showLoading("Uploading...");

    return file.uploadFile(
        fileData,
        fileArgs,
        (completedBytes, totalBytes) => {
            if (totalBytes > 0) {
                const percent = Math.round(
                    (completedBytes / totalBytes) * 100
                );

            }
        },
        "csl_app.api.upload.upload_file"
    )
        .then(async result => {
            await loading.dismiss();

            return { data: result.data.message.file_url, error: null };
        })
        .catch(async e => {
            await loading.dismiss();
            handleErrorMessage(e);
            return { data: null, e };
        });
}
