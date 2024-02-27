import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
    req: Request,
    {params} : { params: { storeId: string }}
) {
	try {
		const { userId } = auth();
		const body = await req.json();
        const { label, imageUrl } = body;

		if (!userId) {
			return new NextResponse("Unauthenticated", { status: 401 });
		}

        if (!label) {
            return new NextResponse("Label is required", {status: 400});
        }

        if (!imageUrl) {
            return new NextResponse("Image URL is required", {status: 400});
        }

        const billboard = await prismadb.billboard.create({
            data: {
                label,
                imageUrl,
                storeId: params.storeId
            }
        });

        if (!params.storeId) {
            return new NextResponse("Store ID is required", {status: 400});
        }

        // Confirm if store is exist for this user
        const storeByUserId = await prismadb.store.findFirst(
            {
                where: {
                    id: params.storeId,
                    userId
                }
            }
        )

        if (!storeByUserId) {
            return new NextResponse("Unauthorized", { status: 403 })
        }

        return NextResponse.json(billboard);

	} catch (error) {
		console.log("[STORES_POST]", error);
		return new NextResponse("Internal Error", { status: 500 });
	}
}


export async function GET(
    req: Request,
    {params} : { params: { storeId: string }}
) {
	try {
		

        if (!params.storeId) {
            return new NextResponse("Store ID is required", {status: 400});
        }

        const billboard = await prismadb.billboard.findMany({
            where: {
                storeId: params. storeId
            }
        });

        return NextResponse.json(billboard);

	} catch (error) {
		console.log("[STORES_POST]", error);
		return new NextResponse("Internal Error", { status: 500 });
	}
}
