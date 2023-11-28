import { NextResponse } from 'next/server'
import prisma from '@/lib/db'
import { checkLoggedIn } from '@/lib/auth'

// create new note with no content and new title, and connect it to a notebook
export async function POST(request) {
    const loggedInData = await checkLoggedIn(request)
    const authorId = loggedInData.user.id
    const { title, notebookId } = await request.json()

    const newNote = await prisma.note.create({
        data: {
            title: title,
            author: { connect: { id: authorId } }, // eventually switch this out so it just uses the logged in user id
            notebook: { connect: { id: notebookId } },
        },
    })
    return NextResponse.json(newNote)
}
