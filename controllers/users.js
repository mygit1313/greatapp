import { excuteQuery } from '@/lib/db';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {
    SECRET,
    EXPIRESIN,
    ACCOUNT_STATUS_ENUM,
    USER_ROLE,
    LOGIN_SESSIONS_LIMIT,
    ACCOUNT_VERIFICATION_EMAIL_TEMPLATE,
    ACCOUNT_VERIFICATION_CONFIRMATION_EMAIL_TEMPLATE,
    RESET_PASSWORD_EMAIL_TEMPLATE_SHARED_BY_ADMIN
} from '@/contants';
import { sendEmail, createContact, sendSMS, sendSendWhatsappMessage } from '@/controllers/sendNotifications';

excuteQuery("UPDATE active_sessions SET logout = 1 WHERE login_time < CURDATE() and logout = 0", []);

// Utility function to generate a 6-digit random OTP
const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000);
};

function getAccountStatusResponse(account_status) {
    if (account_status === ACCOUNT_STATUS_ENUM.pending_verification) {
        return {
            success: false,
            message: "Account is not active. Please verify your account."
        };
    }
    if (account_status === ACCOUNT_STATUS_ENUM.suspended) {
        return {
            success: false,
            message: "Your account is suspended. Please contact support for assistance."
        };
    }
    if (account_status === ACCOUNT_STATUS_ENUM.deleted) {
        return {
            success: false,
            message: "Your account has been deleted. If this is a mistake, please contact support."
        };
    }
    // ... handle other cases if needed

    return null; // Return null if account status is not recognized
}
function errorsResponse(message, errorsData = []) {

    return {
        success: false,
        message: message,
        errors: errorsData
    };
}


export const signUp = async (request, host) => {
    try {
        const { first_name, last_name, email, phone, password, country, country_code, state, city, pin_code } = request;

        // Check if the email is already registered
        const checkEmailQuery = "SELECT id FROM users WHERE email = ?";
        const checkEmailParams = [email];
        const existingEmailUsers = await excuteQuery(checkEmailQuery, checkEmailParams);
        var errorsArray = [];
        if (existingEmailUsers.length > 0) {
            // Email is already registered
            errorsArray.push({
                path: 'email',
                message: "Email already registered."
            });
        }

        // Check if the phone is already registered
        const checkPhoneQuery = "SELECT id FROM users WHERE phone = ?";
        const checkPhoneParams = [phone];
        const existingPhoneUsers = await excuteQuery(checkPhoneQuery, checkPhoneParams);

        if (existingPhoneUsers.length > 0) {
            // Phone is already registered
            errorsArray.push({
                path: 'phone',
                message: "Phone already registered."
            });

        }
        if (errorsArray.length > 0) {
            return errorsResponse("Phone/Email already registered.", errorsArray);
        }

        const uuid = uuidv4();

        // Hash the password using bcrypt
        const saltRounds = 10; // You can adjust this based on your requirements
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const query = "INSERT INTO users (first_name, last_name, email, phone, uuid, password, role, account_status, two_factor_enabled, verification_code, verification_code_valid_till, updated_at, deleted_at, country, country_code, state, city, pin_code) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        const queryParams = [first_name, last_name, email, phone, uuid, hashedPassword, USER_ROLE.frontend_user, ACCOUNT_STATUS_ENUM.pending_verification, 0, 0, new Date(), new Date(), '', country, country_code, state, city, pin_code];

        const result = await excuteQuery(query, queryParams);
        if (result.insertId) {

            await sendEmail(ACCOUNT_VERIFICATION_CONFIRMATION_EMAIL_TEMPLATE, {
                TITLE: "Account Verification",
                VERIFICATION_URL: host + "/verify-account/" + uuid
            }, {
                email: email,
                name: first_name
            });

            return {
                success: true,
                message: "An email containing a confirmation link has been shared on your email address. To activate your account, kindly utilize the provided link."
            };
        } else {
            return errorsResponse("An error has occurred. Please try again later, after some time.");
        }

    } catch (error) {
        console.log("Error in creating record:", error);
        return errorsResponse("An error has occurred. Please try again later, after some time.");

        //throw error;
    }
};

export const signInWithPassword = async (email, password, ip_address = "", browser) => {
    try {
        // Fetch user record from the database based on the provided email
        const query = "SELECT id, password, account_status, role FROM users WHERE email = ?";
        const queryParams = [email];
        const result = await excuteQuery(query, queryParams);
        var queryForSettings = "SELECT * from data_security_settings";
        var queryParamsForSettings = [];

        const resultForSettings = await excuteQuery(queryForSettings, queryParamsForSettings);
        const { login_limit } = resultForSettings[0]
        if (result.length === 0) {
            // User with the provided email does not exist
            return errorsResponse("Invalid email or password.");
        }

        const user = result[0];
        const { id, password: hashedPassword, account_status, role } = user;
        const checkIfStatusIsNotActive = getAccountStatusResponse(account_status);
        if (checkIfStatusIsNotActive) {
            return checkIfStatusIsNotActive;
        }
        else if (account_status === ACCOUNT_STATUS_ENUM.active) {
            // Compare the provided password with the stored hashed password
            const isPasswordValid = await bcrypt.compare(password, hashedPassword);

            if (isPasswordValid) {
                // Password is valid, user can be logged in

                // const queryForLimits = "SELECT COUNT(*) AS session_count FROM active_sessions WHERE user_id = ? and logout = 0";
                const queryForLimits = "SELECT COUNT(*) AS session_count FROM active_sessions WHERE user_id = ? and deleted = 0 and logout = 0 GROUP BY ip_address";
                const limitsResult = await excuteQuery(queryForLimits, [id]);
                // Create a JWT token with user ID as payload
                if (limitsResult.length < login_limit || role == USER_ROLE.admin) {
                    const token = jwt.sign({ userId: id }, SECRET, { expiresIn: EXPIRESIN });
                    const insertSessionQuery = "INSERT INTO active_sessions (user_id, token, login_time, logout, ip_address, browser, deleted) VALUES (?, ?, NOW(), 0, ?, ?, 0)";
                    await excuteQuery(insertSessionQuery, [id, token, ip_address, browser]);
                    return {
                        success: true,
                        message: 'Login successful',
                        data: {
                            //userId: id,
                            token: token,
                            role: role
                        }
                    };
                } else {
                    return errorsResponse("Maximum active sessions exceeded. Please contact support for assistance.");
                }

            } else {
                // Password is invalid
                return errorsResponse("Invalid email or password.");
            }
        }

    } catch (error) {
        console.log("Error in login:", error);
        return errorsResponse("An error has occurred. Please try again later, after some time.");

        //throw error;
    }
};
