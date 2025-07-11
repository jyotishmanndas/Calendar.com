import { CurrentProfile } from "@/lib/currentProfile";
import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
    const profile = await CurrentProfile();

    if (!profile) {
        return new NextResponse("Unauthorized", { status: 401 })
    };

    try {
        const { username, name, email } = await req.json();

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
        const profileUpdate = await prisma.user.update({
            where: {
                id: profile.id
            },
            data: {
                username,
                name,
                email,
            }
        })
        return NextResponse.json(profileUpdate, { status: 200 })
    } catch (error) {
        return new NextResponse("Internal error", { status: 500 })
    }
}