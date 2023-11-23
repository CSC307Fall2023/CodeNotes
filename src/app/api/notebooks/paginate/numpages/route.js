import { NextResponse } from 'next/server'
import prisma from '@/lib/db'
import { checkLoggedIn } from '@/lib/auth'

// get total number of pages for pagination
export async function GET(request) {
    const loggedInData = await checkLoggedIn()
    const userId = loggedInData.user.id
    const { searchParams } = new URL(request.url)
    const size = parseInt(searchParams.get('size'))
    const count = await prisma.notebook.count({
        where: {
            ownerId: {
                equals: userId,
            },
            favorited: {
                equals: true,
            },
        },
    })
    const numPages = Math.ceil(count / size)
    return NextResponse.json(numPages)
}
