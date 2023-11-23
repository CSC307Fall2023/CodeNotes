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

// Edit notebook with new name, owner, and/or favorited status
export async function PATCH(request, { params }) {
    const id = parseInt(params.id)
    const { name, ownerId, favorited } = await request.json()
    console.log('name', name)
    console.log('ownerId', ownerId)
    console.log('favorited', favorited)
    const updatedNotebook = await prisma.notebook.update({
        where: {
            id,
        },
        data: {
            name: name || undefined,
            owner: ownerId ? { connect: { id: ownerId } } : undefined,
            favorited: favorited != undefined ? favorited : undefined,
        },
    })
    return NextResponse.json(updatedNotebook)
}
