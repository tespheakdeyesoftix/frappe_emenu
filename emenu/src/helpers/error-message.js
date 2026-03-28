
import { stripHtmlTags } from "@/helpers/utils";

export async function handleErrorMessage(error_data) {
    let messages = []
    if(error_data.message && (typeof error_data.message) == "string"){
        messages.push(error_data.message)
        if (error_data._server_messages){
            messages = messages.concat( getServerMessage(error_data._server_messages))

        }
       
        showWarningMessage(messages.join("\n"))
        return;
    }
    const dictionary = [
        { exception: 'frappe.exceptions.MandatoryError', text: 'Invalid input' },
        { exception: 'frappe.exceptions.TimestampMismatchError', text: 'Please refresh to get the latest document.' },
        { exception: 'frappe.exceptions.LinkExistsError', text: 'Cannot delete because it has relative data.' }
    ];

    const message = JSON.parse(JSON.stringify(error_data));

    if (message._error_message) {
        showWarningMessage(message._error_message);
    }

    if (message._server_messages) {

        const _server_messages = JSON.parse(message._server_messages);

        _server_messages.forEach((r) => {
            const parsed = JSON.parse(r);
            if (parsed.message) {
                showWarningMessage(parsed.message.replace("Error: ", ""));
            }
        });

    } else if (message.httpStatus == 417) {
        let arrException = [];

        if (message.exception) {
            if (Array.isArray(message.exception)) {
                arrException = message.exception;

            } else if (message.exception) {
                arrException = message.exception.split(':');
            }

            if (arrException[0]) {
                if (arrException[0] === 'frappe.exceptions.ValidationError') {
                    showWarningMessage(arrException[1]);
                } else {
                    const msg = dictionary.find((r) => r.exception === arrException[0]);
                    if (msg && msg.text) {
                        showWarningMessage(msg.text);
                    }
                }
            }
        }

    } else {
        showWarningMessage(message.httpStatusText);
    }
}


function getServerMessage(server_message){
     const _server_messages = JSON.parse(server_message);
        let message = []
        _server_messages.forEach((r) => {
            const parsed = JSON.parse(r);
            if (parsed.message) {
                message.push(parsed.message.replace("Error: ", ""))
            }
        });
        return message;
}
export async function showSuccessMessage(message) {
    const _server_messages = JSON.parse(message);

    _server_messages.forEach((r) => {
        const parsed = JSON.parse(r);
        if (parsed.message) {
            app.showSuccess("Success",parsed.message.replace("Error: ", ""));
        }
    });
}

export async function showWarningMessage(message) {
    app.showWarning("Warning",message);
}
