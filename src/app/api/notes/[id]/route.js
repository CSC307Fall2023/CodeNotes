import { NextResponse } from 'next/server'
import prisma from '@/lib/db'

function exclude(user, keys) {
    return Object.fromEntries(
        Object.entries(user).filter(([key]) => !keys.includes(key))
    )
}

export async function GET(request, { params }) {
    const id = parseInt(params.id)
    if (id) {
        const note = await prisma.note.findUnique({
            where: {
                id,
            },
        })
        return NextResponse.json(note)
    }
}
