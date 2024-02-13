import { resetPassword, checkVerificationToken } from '@/controllers/users';
import { NextResponse } from "next/server";
import * as yup from 'yup';

const validationSchema = yup.object().shape({
    verification_token: yup
        .string()
        .required('Verification token is required'),
    password: yup
        .string()
        .min(8, 'Password must be at least 8 characters')
        .required('Password is required'),
    confirm_password: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Passwords must match')
        .required('Confirm password is required'),
});

export async function POST(req) {
    const body = await req.json();
    try {
        await validationSchema.validate(body);
        var data = await resetPassword(body);
        var status = 200;
        if(!data.success){
            status = 400
        }
        return NextResponse.json(data, {
            status: status,
        })
    } catch (err) {
        return NextResponse.json(err, {
            status: 400,
        })
    }

}

export async function GET(req){
    try {
        const url = new URL(req.url);
        const searchParams = new URLSearchParams(url.search);
        const verification_token = searchParams.get("check");
        const result = await checkVerificationToken(verification_token);
        if (result.success) {
            return NextResponse.json(result, {
                status: 200,
            });
        } else {
            return NextResponse.json(result, {
                status: 400,
            });
        }

    } catch (err) {
        return NextResponse.json({ success: false, message: "Access denied" }, {
            status: 400,
        });
    }
}
