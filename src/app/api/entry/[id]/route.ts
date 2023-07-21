import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { getUserSessionServer } from "@/auth/actions/auth-actions"
import { revalidatePath } from "next/cache"

interface Params {
    params: {
        id: string
    }
}


export async function DELETE(request: NextRequest, context: Params) {

    const user = await getUserSessionServer();
    if (!user) return NextResponse.json('No autorizado', { status: 401 })


    try {
        const { params } = context;
        await prisma.entry.delete({
            where: {
                id: params.id
            }
        })
   
        return NextResponse.json({ message: 'Entrada eliminada' }, { status: 200 })

    } catch (error) {
        return NextResponse.json(error, { status: 400 });
    }

}