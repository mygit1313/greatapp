import { excuteQuery } from '@/lib/db';

function errorsResponse(message, errorsData = []) {

    return {
        success: false,
        message: message,
        errors: errorsData
    };
}

export const updateUserDashboard = async (request) => {
    try {
        const { formData, id } = request;

        // Check if the email is already registered
        const query = "UPDATE pages_content SET form_data = ? WHERE id = ?";
        const checkParams = [JSON.stringify([formData]), id];
        const result = await excuteQuery(query, checkParams);
        return {
            success: true,
            message: "Record updated successfully."
        };

    } catch (error) {
        console.log("Error in creating record:", error);
        return errorsResponse("An error has occurred. Please try again later, after some time.");

        //throw error;
    }
};

export const getUserDashboard = async (id, timestamp) => {
    try {

        // Check if the email is already registered
        const query = "SELECT * FROM pages_content WHERE id = ?";
        const checkParams = [id];
        const result = await excuteQuery(query, checkParams);
        return {
            success: true,
            message: "Record fetched successfully.",
            result: result,
            timestamp
        };

    } catch (error) {
        console.log("Error in creating record:", error);
        return errorsResponse("An error has occurred. Please try again later, after some time.");

        //throw error;
    }
};