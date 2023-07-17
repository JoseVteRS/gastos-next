import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"


export async function POST(request: Request) {
    const { amount, concept, category } = await request.json()
    const newEntry = await prisma.entry.create({ data: { amount, concept, category } })
    return NextResponse.json(newEntry, { status: 201 })
}


export async function GET() {
    const entries = await prisma.entry.findMany()
    return NextResponse.json(entries)
}