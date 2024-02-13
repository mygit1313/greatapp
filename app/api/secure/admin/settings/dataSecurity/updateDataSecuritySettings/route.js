import { updateDataSecuritySettings } from '@/controllers/settings'; 
import { NextResponse } from "next/server";

export async function PUT(req) {
    const body = await req.json();
    try {
        var data = await updateDataSecuritySettings(body);
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
