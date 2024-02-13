import { myLoginHistory } from '@/controllers/users'; // Import the myLoginHistory function
import { NextResponse } from "next/server";
export async function GET(req) {
    try {
        const userId = req.headers.get('userId');
        const url = new URL(req.url);
        const searchParams = new URLSearchParams(url.search);
        const page = searchParams.get("page");
        const limit = searchParams.get("limit");
        const search = searchParams.get("s");
        const offset = (page - 1)*limit;
        try {
            const logoutResult = await myLoginHistory(userId, limit, offset, page, search);

            if (logoutResult.success) {
                return NextResponse.json(logoutResult, {
                    status: 200,
                });
            } else {
                return NextResponse.json({ success: false, message: logoutResult.message }, {
                    status: 400,
                });
            }
        } catch {
            return NextResponse.json({ success: false, message: "Access denied" }, {
                status: 400,
            });
        }

    } catch (err) {
        return NextResponse.json({ success: false, message: "Access denied" }, {
            status: 400,
        });
    }
}
