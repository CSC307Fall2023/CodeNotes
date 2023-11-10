import { NextResponse } from 'next/server'
import prisma from '@/lib/db'

function exclude(user, keys) {
    return Object.fromEntries(
        Object.entries(user).filter(([key]) => !keys.includes(key))
    )
}

// get pre-existing note
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

// update note 
export async function PATCH(request, {params}) {
    const id = parseInt(params.id)
    
    if (id) {
        const { title, content, notebookId } = await request.json();

        const note = await prisma.note.update({
            where: {
                id,
            },
            data: {
                title: title,
                content: content,
                notebook: { connect: { id: notebookId } },
            },
        })
        return NextResponse.json(note)
    }
}

// delete note 
export async function DELETE(request, {params}) {
    const id = parseInt(params.id)
    
    if (id) {
        const deletedNote = await prisma.note.delete({
            where: {
                id,
            },
        })
        return NextResponse.json(deletedNote);
    }
}

// create new note
export async function POST(request, { params }) {
    const notebookId = parseInt(params.id);
    const title = parseInt(params.title)

    if (notebookId) {
        const { authorId } = await request.json();

        const newNote = await prisma.note.create({
            data: {
                title: title,
                content: "",
                author: { connect: { id: authorId } },
                notebook: { connect: { id: notebookId } },
            },
        });

        // Update the Notebook's notes attribute
        const updatedNotebook = await prisma.notebook.update({
            where: {
                id: notebookId,
            },
            data: {
                notes: {
                    connect: { id: newNote.id },
                },
            },
        });
        return NextResponse.json(newNote);
    }
}
