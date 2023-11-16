import { NextResponse } from 'next/server'
import prisma from '@/lib/db'
import { checkLoggedIn } from '@/lib/auth'


// look into middleware - checks before each call that user is logged in !!! 
// put matches in and paths matcher: put path in the matcher

function exclude(user, keys) {
    return Object.fromEntries(
        Object.entries(user).filter(([key]) => !keys.includes(key))
    )
}

// get pre-existing note with certain id 
export async function GET(request, { params }) {
    const loggedInData = await checkLoggedIn() // to update this in every single API call we have 
    if(loggedInData.loggedIn){
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
}

// update note with potentially new content or a new title or new notebook id
// other terms to call this call is: write to note or rename note or move note to new notebook
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

// delete note with given id
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

// create new note with no content and new title, and connect it to a notebook
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
        return NextResponse.json(newNote);
    }
}
