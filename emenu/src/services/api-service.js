
import { FrappeApp } from 'frappe-js-sdk';
import { showSuccessMessage, handleErrorMessage } from "@/helpers/error-message.js"
const frappe = new FrappeApp()
const db = frappe.db();
const call = frappe.call();
export async function setValue(DocType, name, fields, value = null) {


    if (typeof fields === "string") {
        try {
            const doc = await db.setValue(DocType, name, fields, value);
            return ({ data: doc.message, error: null });
        } catch (err) {
            handleErrorMessage(err);
            return await { data: null, err };
        }

    } else {
        try {
            const doc_1 = await db.setValue(DocType, name, fields);
            return ({ data: doc_1.message, error: null });
        } catch (err_1) {
            handleErrorMessage(err_1);
            return await { data: null, err };
        }
    }
}


export async function logoutApi() {

    const auth = frappe.auth();
    try {
        await auth
            .logout();
        return true;
    } catch {
        return false;
    }
}

export async function getDocList(DocType, param = null) {

    try {
        const r = await db.getDocList(DocType, param);
        return ({ data: r, error: null });
    } catch (error) {
        return { data: null, error };
    }
}

export async function getCount(DocType, param = null) {

    const res = await getApi("frappe.desk.reportview.get_count", {
        doctype: DocType,
        filters: param
    })
    return res;

}

export async function getApi(api_url, param = null) {
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

export async function postApi(api_url, param = null) {

    try {
        const r = await call.post(api_url, param);
        return { data: r.message, error: null };
    } catch (error) {
        // handleErrorMessage(error);
        alert("error");
        return { data: null, error };
    }
}

export async function getDoc(DocType, DocName) {

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

export async function getValue(DocType, name, fields) {


    return db.getValue(DocType, fields, [["name", "=", name]])
        .then(doc => ({ data: doc.message, error: null }))
        .catch(error => {
            handleErrorMessage(error);
            return { data: null, error };
        });
}

export async function createDoc(DocType, params) {


    return db.createDoc(DocType, params)
        .then(doc => ({ data: doc, error: null }))
        .catch(error => {
            handleErrorMessage(error);
            return { data: null, error };
        });
}

export async function updateDoc(DocType, name, params) {
    return db.updateDoc(DocType, name, params)
        .then(doc => ({ data: doc, error: null }))
        .catch(error => {
            handleErrorMessage(error);
            return { data: null, error };
        });
}

export async function deleteDoc(DocType, DocName) {


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
           
            return { data: result.data.message.file_url, error: null };
        })
        .catch(async e => {
          
            handleErrorMessage(e);
            return { data: null, e };
        });
}
