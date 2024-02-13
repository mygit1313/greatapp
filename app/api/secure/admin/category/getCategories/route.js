import { categoriesListing } from '@/controllers/categories'; // Import the usersList function
import { NextResponse } from "next/server";
export async function GET(request) {
    try {
        const url = new URL(request.url);
        const searchParams = new URLSearchParams(url.search);
        const page = searchParams.get("page");
        const limit = searchParams.get("limit");
        const search = searchParams.get("s");
        const offset = (page - 1)*limit;
        const result = await categoriesListing(limit, offset, page, search);
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
