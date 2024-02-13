import { getDataSecuritySettings } from '@/controllers/settings';
import { NextResponse } from "next/server";
export async function GET(request) {
    try {
        const url = new URL(request.url);
        const searchParams = new URLSearchParams(url.search);
        const timestamp = searchParams.get("timestamp");
        const result = await getDataSecuritySettings(timestamp);
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
