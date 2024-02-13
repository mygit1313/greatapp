import { signUp } from '@/controllers/users';
import { NextResponse } from "next/server";
import * as yup from 'yup';

const signUpValidationSchema = yup.object().shape({
    first_name: yup
        .string()
        .required('First name is required'),
    last_name: yup
        .string()
        .required('Last name is required'),
    email: yup
        .string()
        .email('Invalid email format')
        .required('Email is required'),
    phone: yup
        .string()
        .matches(/^[6-9]\d*$/, 'Please enter valid phone number')
        .required('Phone number is required'),
    password: yup
        .string()
        .required('Password is required')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\\-\/]).{8,10}$/,
            'Password must contain at least 8 to 10 characters including at least one lowercase letter, one uppercase letter, one number, and one special character'
          ),
    confirm_password: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Passwords must match')
        .required('Confirm password is required'),
});

export async function POST(req) {
    const body = await req.json();
    try {
        const host = req.headers.get('origin');

        await signUpValidationSchema.validate(body);
        var data = await signUp(body, host);
        var status = 200;
        if (!data.success) {
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
