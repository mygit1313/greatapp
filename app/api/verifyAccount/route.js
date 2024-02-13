import { verifyAccount } from '@/controllers/users';
import { NextResponse } from "next/server";
import * as yup from 'yup';

const validationSchema = yup.object().shape({
    uuid: yup.string().test(
        'is-uuid',
        'Page not found!',
        value => {
            // Regular expression to match UUID format
            const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
            return uuidRegex.test(value);
        }
    )
});

export async function PUT(req) {
    const body = await req.json();
    try {
        //await validationSchema.validate(body);
        var data = await verifyAccount(body.uuid);
        return NextResponse.json(data, {
            status: 200,
        })
    } catch (err) {
        return NextResponse.json(err, {
            status: 400,
        })
    }

}
