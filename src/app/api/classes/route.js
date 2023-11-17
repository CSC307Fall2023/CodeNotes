import { NextResponse } from 'next/server'
import prisma from '@/lib/db'
import bcrypt from 'bcryptjs'

// create a new class
export async function POST(request) {
    const { name, description, teacherId, password } = await request.json()
    const hashedPassword = await bcrypt.hash(password, 10)
    // // check to make sure user is a teacher
    // const loggedInData = await checkLoggedIn()
    // if (!loggedInData.loggedIn) {
    //     return NextResponse.json({ error: 'not signed in' }, { status: 403 })
    // }
    // if (!loggedInData.user?.role === 'TEACHER') {
    //     return NextResponse.json(
    //         { error: 'user is not a teacher' },
    //         { status: 403 }
    //     )
    // }

    const newClass = await prisma.class.create({
        data: {
            name: name,
            password: hashedPassword,
            description: description,
            teacher: {
                connect: {
                    id: teacherId,
                },
            },
        },
        include: {
            students: true,
            teacher: true,
        },
    })
    return NextResponse.json(newClass)
}
