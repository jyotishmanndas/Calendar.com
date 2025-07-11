import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { CurrentProfile } from "@/lib/currentProfile";

export async function POST(req: NextRequest) {
    try {
        const { username, email, password } = await req.json();

        if (username) {
            const existingUsername = await prisma.user.findUnique({
                where: {
                    username
                }
            });

            if (existingUsername) {
                return new NextResponse("Username already taken", { status: 409 });
            }
        };

        const existingUser = await prisma.user.findFirst({
            where: {
                email
            }
        });
        if (existingUser) {
            return new NextResponse("Already registered", { status: 400 })
        };

        const hashedPassword = await bcrypt.hash(password, 12);
        const signUpResponse = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
                emailVerified: new Date()
            }
        });
        return NextResponse.json({
            id: signUpResponse.id,
            username: signUpResponse.username,
            email: signUpResponse.email
        }, { status: 200 })

    } catch (error) {
        console.log(error);
        return new NextResponse("Internal error", { status: 500 })
    }
}


export async function GET(req: NextRequest) {
    const profile = await CurrentProfile();
    if (!profile) {
        return new NextResponse("Unauthorized", { status: 401 })
    };

    const data = await prisma.user.findFirst({
        where: {
            id: profile.id
        }
    })

    return NextResponse.json(data, { status: 200 })
}