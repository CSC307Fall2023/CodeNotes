import { NextResponse } from 'next/server'
import prisma from '@/lib/db'

function exclude(item, keys) {
    return Object.fromEntries(
        Object.entries(item).filter(([key]) => !keys.includes(key))
    )
}

// Get paginated list of notebooks by a given user
export async function GET(request, { params }) {
    const userId = parseInt(params.id)
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page'))
    const size = parseInt(searchParams.get('size'))
    console.log(page, size)
    const notebooks = await prisma.notebook.findMany({
        skip: (page - 1) * size,
        take: size,
        where: {
            ownerId: {
                equals: userId,
            },
        },
        include: {
            notes: true,
        },
    })
    return NextResponse.json(notebooks)
}
