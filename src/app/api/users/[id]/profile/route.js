import { NextResponse } from 'next/server'
import prisma from '@/lib/db'

// creates a new profile for a user
export async function POST(request, { params }) {
    const data = await request.json()
    const { name, major, year } = data
    const userId = parseInt(params.id)
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
            },
        })
    } catch (e) {
        return NextResponse.json({ error: e.message }, { status: 500 })
    }
    return NextResponse.json(profile)
}

// updates a profile for a user
export async function PATCH(request, { params }) {
    const data = await request.json()
    const { name, major, year } = data
    const userId = parseInt(params.id)
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
export async function GET(request, { params }) {
    const userId = parseInt(params.id)
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
