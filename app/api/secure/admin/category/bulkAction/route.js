import { bulkAction } from '@/controllers/categories'; // Import the usersList function
import { NextResponse } from "next/server";
export async function PUT(request) {
    try {
        const body = await request.json();
        const { actionType, selectedUsers } = body;
        const result = await bulkAction(actionType, selectedUsers);
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
