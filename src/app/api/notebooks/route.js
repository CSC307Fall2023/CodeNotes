import { NextResponse } from 'next/server'
import prisma from '@/lib/db'

// Get all notebooks 
export async function GET(request) { // for get make it just get all notebooks
    const loggedInData = await checkLoggedIn();
        if (loggedInData.loggedIn) {
          const notebooks = await prisma.notebook.findMany({
            where: {
              ownerId: {
                equals: loggedInData.user?.id
              }
            }
          });
          return NextResponse.json(notebooks);
    }
        return NextResponse.json({error: 'not signed in'}, {status: 403});
}



// Create new notebook - keep post no params 
export async function POST(request) {
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
