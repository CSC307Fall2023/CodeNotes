import { NextResponse } from 'next/server'
import prisma from '@/lib/db'
import bcrypt from 'bcryptjs'
import { checkLoggedIn } from '@/lib/auth'

function excludePassword(user) {
    const { password, ...userWithoutPassword } = user
    return userWithoutPassword
}

export async function POST(request) {
    const data = await request.json()
    const { email, password } = data
    if (email && password) {
        const hashedPassword = await bcrypt.hash(password, 10)
        let user
        try {
            user = await prisma.user.create({
                data: { email, password: hashedPassword },
            })
        } catch (e) {
            return NextResponse.json({ error: e.message }, { status: 500 })
        }
        return NextResponse.json(user)
    }
    return NextResponse.json(
        { error: 'Email or Password not defined' },
        { status: 500 }
    )
}

// gets the logged in user
export async function GET(request) {
    const loggedInData = await checkLoggedIn()
    const userId = loggedInData.user.id
    let user
    try {
        user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
            include: {
                profile: true,
                notebooks: true,
                studentin: true,
            },
        })
    } catch (e) {
        return NextResponse.json({ error: e.message }, { status: 500 })
    }
    return NextResponse.json(excludePassword(user))
}
