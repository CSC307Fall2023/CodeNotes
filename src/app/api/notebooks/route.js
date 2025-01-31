import { NextResponse } from 'next/server'
import prisma from '@/lib/db'
import { checkLoggedIn } from '@/lib/auth'

function exclude(item, keys) {
    return Object.fromEntries(
        Object.entries(item).filter(([key]) => !keys.includes(key))
    )
}

// Get all notebooks by a given user
export async function GET(request) {
    const loggedInData = await checkLoggedIn()
    if (loggedInData.loggedIn) {
        const notebooks = await prisma.notebook.findMany({
            where: {
                ownerId: {
                    equals: loggedInData.user?.id,
                },
            },
            include: {
                notes: {
                    select: {
                        id: true,
                        title: true,
                    },
                },
            },
        })

        return NextResponse.json(notebooks)
    }
    return NextResponse.json({ error: 'not signed in' }, { status: 403 })
}

// Create new notebook - keep post no params
export async function POST(request) {
    const loggedInData = await checkLoggedIn()
    const ownerId = loggedInData.user?.id
    const { name, classId } = await request.json()

    const newNotebook = await prisma.notebook.create({
        data: {
            name: name,
            owner: { connect: { id: ownerId } },
            class: classId ? { connect: { id: classId } } : undefined,
        },
        include: {
            notes: true,
        },
    })
    return NextResponse.json(newNotebook)
}

// // Create new notebook (production version with login validation)
// export async function POST(request) {
//   const loggedInData = await checkLoggedIn()
//   if (loggedInData.loggedIn) {
//       const { name, classId } = await request.json()
//       try {
//           const newNotebook = await prisma.notebook.create({
//               data: {
//                   name: name,
//                   owner: { connect: { id: loggedInData.user?.id } },
//                   class: { connect: { id: classId } },
//               },
//               include: {
//                   notes: true,
//               },
//           })
//           return NextResponse.json(newNotebook)
//       } catch (e) {
//           return NextResponse.json({ error: e }, { status: 500 })
//       }
//   }
//   return NextResponse.json({ error: 'not signed in' }, { status: 403 })
// }
