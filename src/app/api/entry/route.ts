import { getUserSessionServer } from "@/auth/actions/auth-actions"
import prisma from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { revalidatePath } from "next/cache"
import { NextResponse } from "next/server"


export async function POST(request: Request) {
    const user = await getUserSessionServer();

    if (!user) {
        return NextResponse.json('No autorizado', { status: 401 });
    }

    const { amount, concept, category } = await request.json()
    const newEntry = await prisma.entry.create({ data: { amount, concept, category, userId: user.id } })

    revalidatePath('/')
    return NextResponse.json(newEntry, { status: 201 })
}


export async function GET() {
    const user = await getUserSessionServer();

    if (!user) {
        return NextResponse.json('No autorizado', { status: 401 });
    }

    try {
        const entries = await prisma.entry.findMany({
            where: {
                userId: user.id
            }
        })
        return NextResponse.json(entries)
    } catch (error) {
        return NextResponse.json(error, { status: 400 });
    }
}