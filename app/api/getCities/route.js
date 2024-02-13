import { getCities } from '@/controllers/users'; 
import { NextResponse } from "next/server";
export async function GET(request) {
    try {
        const url = new URL(request.url);
        const searchParams = new URLSearchParams(url.search);
        const id = searchParams.get("id");
        const result = await getCities(id);
        if (result.success) {
            return NextResponse.json(result, {
                status: 200,
            });
        } else {
            return NextResponse.json({ success: false, message: result.message }, {
                status: 400,
            });
        }

    } catch (err) {
        return NextResponse.json({ success: false, message: "Access denied" }, {
            status: 400,
        });
    }
}
