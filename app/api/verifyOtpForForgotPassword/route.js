import * as yup from 'yup';
import { verifyOtpForForgotPassword } from '@/controllers/users'; // Import the signInWithOtp function
import { NextResponse } from "next/server";

const validationSchema = yup.object().shape({
    email: yup
        .string()
        .email('Invalid email format')
        .required('Email is required'),
    otp: yup
        .string()
        .required('OTP is required')
});

export async function POST(req) {
    const body = await req.json();
    try {
        await validationSchema.validate(body);
        const { email, otp } = body;
        const result = await verifyOtpForForgotPassword(email, otp);

        if (result.success) {
            return NextResponse.json(result, {
                status: 200,
            });
        } else {
            return NextResponse.json({ success: false, message: result.message }, {
                status: 401, // Unauthorized
            });
        }
    } catch (err) {
        return NextResponse.json({ success: false, message: "Invalid email or otp.", err }, {
            status: 500,
        });
    }
}
