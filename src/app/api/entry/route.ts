import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"


export async function POST(request: Request) {
    const { amount, concept, category, userId } = await request.json()
    const newEntry = await prisma.entry.create({ data: { amount, concept, category, userId } })
    return NextResponse.json(newEntry, { status: 201 })
}


export async function GET(request: Request) {
    // const requestData = await request.json()

    const entries = await prisma.entry.findMany({
        where: {
            userId: '7346dc56-7850-440a-8ff1-bf1d0e281ce0'
        }
    })
    return NextResponse.json(entries)
}