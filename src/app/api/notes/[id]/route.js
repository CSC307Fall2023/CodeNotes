import { NextResponse } from 'next/server'
import prisma from '@/lib/db'

function exclude(user, keys) {
    return Object.fromEntries(
        Object.entries(user).filter(([key]) => !keys.includes(key))
    )
}

// get pre-existing note with certain id
export async function GET(request, { params }) {
    const id = parseInt(params.id)
    if (id) {
        const note = await prisma.note.findUnique({
            where: {
                id,
            },
        })
        return NextResponse.json(note)
    }
}
  
// update note with potentially new content or a new title or new notebook id
// other terms to call this call is: write to note or rename note or move note to new notebook
export async function PATCH(request, { params }) {
    const id = parseInt(params.id)
    if (id) {
        const { title, content, notebookId } = await request.json()

        // getting current note information 
        const currentNote = await prisma.note.findUnique({
            where: {
              id,
            },
            select: {
                notebookId: true,
                title: true,
                content: true,
            },
        });

        const note = await prisma.note.update({
            where: {
                id,
            },
            data: {
                title: title ?? currentNote.title,
                content: content ?? currentNote.content,
                notebook: notebookId
                ? { connect: { id: notebookId } }
                : { connect: { id: currentNote.notebookId } },
            },
        })
        return NextResponse.json(note)
    }
}

// delete note with given id
export async function DELETE(request, { params }) {
    const id = parseInt(params.id)

    if (id) {
        const deletedNote = await prisma.note.delete({
            where: {
                id,
            },
        })
        return NextResponse.json(deletedNote)
    }
}
