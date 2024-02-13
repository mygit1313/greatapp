import { updateUserDashboard, getUserDashboard } from '@/controllers/pages'; // Import the usersList function
import { NextResponse } from "next/server";
export async function PUT(request) {
    try {
        const body = await request.json();
        const result = await updateUserDashboard(body);
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

export async function GET(request) {
    try {
        const url = new URL(request.url);
        const searchParams = new URLSearchParams(url.search);
        const id = searchParams.get("id");
        const result = await getUserDashboard(id);
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

