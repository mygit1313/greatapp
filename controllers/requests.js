import { excuteQuery } from '@/lib/db';
import {
    NEW_REQUEST_EMAIL_TEMPLATE,
    SEND_EMAIL_TO_ADMIN,
    SEND_EMAIL_TO_ADMIN_NAME
} from '@/contants';
import { sendEmail } from '@/controllers/sendNotifications';

function errorsResponse(message, errorsData = []) {

    return {
        success: false,
        message: message,
        errors: errorsData
    };
}

export const addRequest = async (request) => {
    try {
        const { name, email, phone, message, request_type } = request;
        
        var query = `INSERT INTO requests (name, email, phone, message, request_type) VALUES (?, ?, ?, ?, ?)`;
        var queryParams = [name, email, phone, message, request_type];
        var dataKeys = ["", "Feedback", "Testimonial", "Ticket"];
        var result = await excuteQuery(query, queryParams);
        await sendEmail(NEW_REQUEST_EMAIL_TEMPLATE, {
            NAME: name,
            EMAIL: email,
            PHONE: phone,
            MESSAGE: message,
            REQUEST_TYPE: dataKeys[request_type]
        }, {
            email: SEND_EMAIL_TO_ADMIN,
            name: SEND_EMAIL_TO_ADMIN_NAME
        });
        return {
            success: true,
            message: "Thank you for your feedback! Just as in the stock market, every input counts. Your request has been processed successfully."
        };

    } catch (error) {
        console.log("Error in creating record:", error);
        return errorsResponse("An error has occurred. Please try again later, after some time.");

        //throw error;
    }
};
