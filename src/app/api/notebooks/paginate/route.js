import { NextResponse } from 'next/server'
import prisma from '@/lib/db'
import { checkLoggedIn } from '@/lib/auth'

function exclude(item, keys) {
    return Object.fromEntries(
        Object.entries(item).filter(([key]) => !keys.includes(key))
    )
}

// Get paginated list of notebooks by logged in user
export async function GET(request) {
    const loggedInData = await checkLoggedIn()
    const userId = loggedInData.user.id
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page'))
    const size = parseInt(searchParams.get('size'))
    const filter = searchParams.get('filter')
    console.log(page, size)
    const notebooks = await prisma.notebook.findMany({
        skip: (page - 1) * size,
        take: size,
        where: {
            ownerId: {
                equals: userId,
            },
            favorited: {
                equals: true,
            },
        },
        include: {
            notes: true,
        },
    })
    return NextResponse.json(notebooks)
}
