// [storeId] targets individual stores

import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

// Patch route: To update the store
export async function PATCH( 
    req: Request, 
    { params }: { params: { storeId: string } }
    
    ) {
    try {
        const { userId } = auth();
        const body = await req.json();

        const {name} = body;

        if (!userId) {
            return new NextResponse("Unauthenticated", {status: 401})
        }

        if (!name) {
            return new NextResponse("Name is required", {status: 400})
        }

        if (!params.storeId) {
            return new NextResponse("Store Id is required", {status: 400});
        }

        // Handle shop name change
        const store = await prismadb.store.updateMany({
            where: {
                id: params.storeId,
                userId
            },
            data: {
                name
            }
        })
        return NextResponse.json(store);

    } catch (error) {
        console.log('[STORE_PATCH]', error);
        return new NextResponse("Internal error", { status: 500 })
    }
}

// Delete route
export async function DELETE( 
    
    req: Request, 
    { params }: { params: { storeId: string } }
    
    ) {
    try {
        const { userId } = auth();


        if (!userId) {
            return new NextResponse("Unauthenticated", {status: 401})
        }

        if (!params.storeId) {
            return new NextResponse("Store Id is required", {status: 400});
        }

        // Handle shop name change
        const store = await prismadb.store.deleteMany({ // Using deleteMany because of "userId"
            where: {
                id: params.storeId,
                userId
            }
        })
        return NextResponse.json(store);


    } catch (error) {
        console.log('[STORE_DELETE]', error);
        return new NextResponse("Internal error", { status: 500 })
    }
}