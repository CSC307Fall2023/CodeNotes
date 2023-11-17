import { NextResponse } from 'next/server'
import prisma from '@/lib/db'
import bcrypt from 'bcryptjs'

// exclude certain keys from an object
function exclude(obj, keys) {
    return Object.fromEntries(
        Object.entries(obj).filter(([key]) => !keys.includes(key))
    )
}

// add an existing student to a class
export async function POST(request, { params }) {
    // check to make sure user is logged in
    // const loggedInData = await checkLoggedIn()
    // if (!loggedInData.loggedIn) {
    //     return NextResponse.json({ error: 'not signed in' }, { status: 403 })
    // }
    // get student id from logged in user
    // const studentId = loggedInData.user.id

    const studentId = 2
    const classId = parseInt(params.id)
    const { password } = await request.json()
    console.log('studentId', studentId)
    console.log('classId', classId)
    console.log('password', password)
    console.log('uhhh', studentId && password)

    if (studentId && password) {
        // check to make sure that password matches the class password
        const classPassData = await prisma.class.findUnique({
            where: {
                id: classId,
            },
        })
        const passwordMatch = await bcrypt.compare(
            password,
            classPassData.password
        )
        if (!passwordMatch) {
            return NextResponse.json(
                { error: 'incorrect password' },
                { status: 403 }
            )
        }

        let classData
        try {
            classData = await prisma.class.update({
                where: { id: classId },
                data: {
                    students: {
                        connect: {
                            id: studentId,
                        },
                    },
                },
            })
            return NextResponse.json(exclude(classData, ['password']))
        } catch (e) {
            return NextResponse.json({ error: e.message }, { status: 500 })
        }
    }
    return NextResponse.json(
        { error: 'Student ID or Password not defined' },
        { status: 500 }
    )
}
