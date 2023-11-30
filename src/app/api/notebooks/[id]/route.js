import { NextResponse } from 'next/server'
import prisma from '@/lib/db'

// Get notebook we want with id
export async function GET(request, { params }) {
    const id = parseInt(params.id)

    if (id) {
        const notebook = await prisma.notebook.findUnique({
            where: {
                id,
            },
            include: {
                notes: true,
            },
        })

        return NextResponse.json(notebook)
    }
}

// Delete notebook and all notes within it
export async function DELETE(request, { params }) {
    const id = parseInt(params.id)

    if (id) {
        // Get all notes with this notebookId
        const notesToDelete = await prisma.note.findMany({
            where: {
                notebookId: id,
            },
        })

        // Delete all the notes with this notebookId
        await prisma.note.deleteMany({
            where: {
                id: {
                    in: notesToDelete.map((note) => note.id),
                },
            },
        })

        // Delete notebook itself
        const deletedNotebook = await prisma.notebook.delete({
            where: {
                id: id,
            },
        })
        return NextResponse.json(deletedNotebook)
    }
}


export async function PATCH(request, { params }) {
    const id = parseInt(params.id)
    if (id) {
        const { name, ownerId, classId } = await request.json();

        // getting current note information 
        const currentNotebook = await prisma.notebook.findUnique({
            where: {
              id,
            },
            select: {
                name: true,
                ownerId: true,
                classId: true,
            },
        });

        const note = await prisma.note.update({
            where: {
                id,
            },
            data: {
                name: name ?? currentNotebook.name,
                owner: ownerId 
                ? { connect: { id: ownerId } }
                : { connect: { id: currentNotebook.ownerId } },
                class: classId
                ? { connect: { id: classId } }
                : { connect: { id: currentNotebook.classId } }, //should i update the classId field too?? 
            },
        })
        return NextResponse.json(note)
    }
}