import { NextResponse } from 'next/server'
import prisma from '@/lib/db'

// Get notebook we want 
export async function GET(request, { params }) {
    const id = parseInt(params.id);

    if (id) {
        const notebook = await prisma.notebook.findUnique({
            where: {
                id,
            },
            include: {
                notes: true,
            },
        });

        return NextResponse.json(notebook);
    }
}

// Delete notebook and all notes within it 
export async function DELETE(request, {params}) {
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
                    in: notesToDelete.map(note => note.id),
                },
            },
        })
 
        // Delete notebook itself
        const deletedNotebook = await prisma.notebook.delete({
            where: {
                id: id,
            },
        })
        return NextResponse.json(Notebook)
    }
}

// Create new notebook
export async function POST(request, { params }) {
    const { name, ownerId, notebookId } = await request.json();

    const newNotebook = await prisma.notebook.create({
        data: {
            id: notebookId,
            name: name,
            owner: { connect: { id: ownerId } },
            class: { connect: { id: classId } },
        },
        include: {
            notes: true,
        },
        });
    }
