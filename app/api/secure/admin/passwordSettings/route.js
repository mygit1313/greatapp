import { passwordSettings } from '@/controllers/users'; 
import { NextResponse } from "next/server";
import * as yup from 'yup';
import jwtDecode from 'jwt-decode';

const validationSchema = yup.object().shape({
    current_password: yup.string().required('Current password is required'),
    password: yup.string().required('Password is required'),
    confirm_password: yup.string()
        .oneOf([yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required')
});

export async function PUT(request) {
    try {
        const token = request.headers.get('authorization');
        const decoded = jwtDecode(token);
        const body = await request.json();
        await validationSchema.validate(body);

        const result = await passwordSettings(body, decoded.userId);
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
