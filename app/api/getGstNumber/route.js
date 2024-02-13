import { getGstNumber } from '@/controllers/settings';
import { NextResponse } from "next/server";
export async function GET() {
    try {
        const result = await getGstNumber();
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
