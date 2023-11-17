import { NextResponse } from 'next/server'
import prisma from '@/lib/db'

function exclude(user, keys) {
    return Object.fromEntries(
        Object.entries(user).filter(([key]) => !keys.includes(key))
    )
}

// get user by id
export async function GET(request, { params }) {
    const id = parseInt(params.id)
    if (id) {
        const user = await prisma.user.findUnique({
            where: {
                id,
            },
            include: {
                profile: true,
                studentin: true,
            },
        })
        const userWithoutPassword = exclude(user, ['password'])
        return NextResponse.json(userWithoutPassword)
    }
}
