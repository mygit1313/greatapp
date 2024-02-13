import { loggedOut } from '@/controllers/users'; // Import the loggedOut function
import { NextResponse } from "next/server";
export async function POST(req) {
    try {
        const token = req.headers.get('authorization');
        try {
            const logoutResult = await loggedOut(token);

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
