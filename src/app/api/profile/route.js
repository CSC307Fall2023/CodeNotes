import multer from 'multer';
import { NextResponse } from 'next/server'
import prisma from '@/lib/db'
import { checkLoggedIn } from '@/lib/auth'

const multer = multer('multer');
const upload = multer({
    dest: 'images'
    })

// creates a new profile for a user
export async function POST(request) {
    const loggedInData = await checkLoggedIn()
    const data = await request.json()
    const { name, major } = data
    const year = parseInt(data.year)
    const userId = loggedInData.user.id
    const avatarData = request.file ? request.file.buffer : null
    let profile
    try {
        profile = await prisma.profile.create({
            data: {
                name: name,
                major: major,
                year: year,
                user: {
                    connect: {
                        id: userId,
                    },
                },
                photo : avatarData,
            },
        })
    } catch (e) {
        return NextResponse.json({ error: e.message }, { status: 500 })
    }
    return NextResponse.json(profile)
}

// updates a profile for a user
export async function PATCH(request) {
    const data = await request.json()
    const { name, major } = data
    const year = parseInt(data.year)
    const loggedInData = await checkLoggedIn()
    const userId = loggedInData.user.id
    let profile
    try {
        profile = await prisma.profile.update({
            where: {
                userId: userId,
            },
            data: {
                name: name || undefined,
                major: major || undefined,
                year: year || undefined,
            },
        })
    } catch (e) {
        return NextResponse.json({ error: e.message }, { status: 500 })
    }
    return NextResponse.json(profile)
}

// gets a profile for a user
export async function GET(request) {
    const loggedInData = await checkLoggedIn()
    const userId = loggedInData.user.id
    let profile
    try {
        profile = await prisma.profile.findUnique({
            where: {
                userId: userId,
            },
        })
    } catch (e) {
        return NextResponse.json({ error: e.message }, { status: 500 })
    }
    return NextResponse.json(profile)
}
