import { NextResponse } from 'next/server'
import prisma from '@/lib/db'
import bcrypt from 'bcryptjs'

// get class by id
export async function GET(request, { params }) {
    const id = parseInt(params.id)
    if (id) {
        const classData = await prisma.class.findUnique({
            where: {
                id,
            },
            include: {
                teacher: true,
                students: true,
                notebooks: true,
            },
        })
        return NextResponse.json(classData)
    }
}

// update class by id
export async function PATCH(request, { params }) {
    // // check to make sure the user is the teacher of the class
    // const loggedInData = await checkLoggedIn()
    // if (!loggedInData.loggedIn) {
    //     return NextResponse.json({ error: 'not signed in' }, { status: 403 })
    // }
    const classId = parseInt(params.id)

    // const teacherId = loggedInData.user.id
    // const classData = await prisma.class.findUnique({
    //     where: {
    //         id: classId,
    //     },
    //     include: {
    //         teacher: true,
    //     },
    // })
    // if (classData.teacher.id !== teacherId) {
    //     return NextResponse.json(
    //         { error: 'user is not the teacher of this class' },
    //         { status: 403 }
    //     )
    // }
    const { name, description } = await request.json()
    const updatedClass = await prisma.class.update({
        where: {
            id: classId,
        },
        data: {
            name,
            description,
        },
    })
    return NextResponse.json(updatedClass)
}

// delete class by id
export async function DELETE(request, { params }) {
    // // check to make sure the user is the teacher of the class
    // const loggedInData = await checkLoggedIn()
    // if (!loggedInData.loggedIn) {
    //     return NextResponse.json({ error: 'not signed in' }, { status: 403 })
    // }
    const classId = parseInt(params.id)
    const { password } = await request.json()
    const hashedPassword = await bcrypt.hash(password, 10)
    console.log(hashedPassword)

    // const teacherId = loggedInData.user.id
    // const classData = await prisma.class.findUnique({
    //     where: {
    //         id: classId,
    //     },
    //     include: {
    //         teacher: true,
    //     },
    // })
    // if (classData.teacher.id !== teacherId) {
    //     return NextResponse.json(
    //         { error: 'user is not the teacher of this class' },
    //         { status: 403 }
    //     )
    // }
    const deletedClass = await prisma.class.delete({
        where: {
            id: classId,
            password: hashedPassword,
        },
    })
    return NextResponse.json(deletedClass)
}
