import { NextResponse } from 'next/server'
import prisma from '@/lib/db'

function exclude(item, keys) {
    return Object.fromEntries(
        Object.entries(item).filter(([key]) => !keys.includes(key))
    )
}

// Get all classes that a given user is enrolled in
export async function GET(request, { params }) {
    const userId = parseInt(params.id)
    const classes = await prisma.class.findMany({
        where: {
            students: {
                some: {
                    id: userId,
                },
            },
        },
    })
    return NextResponse.json(classes)
}
