import { addCategory } from '@/controllers/categories';
import { NextResponse } from "next/server";
import * as yup from 'yup';

const validationSchema = yup.object().shape({
    name: yup
        .string()
        .required('Category name is required'),
    visibility: yup
        .string()
        .required('Visibility status is required')
});

export async function POST(req) {
    const body = await req.json();
    try {
        await validationSchema.validate(body);
        var data = await addCategory(body);
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
