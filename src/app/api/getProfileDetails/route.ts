import { CurrentProfile } from "@/lib/currentProfile";
import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const profile = await CurrentProfile();
    if (!profile) {
        return new NextResponse("Unauthorized", { status: 401 })
    };

    const data = await prisma.user.findFirst({
        where: {
            id: profile.id
        },
        select:{
            id: true,
            name: true,
            username: true,
            email: true,
            about: true,
        }
    });

    return NextResponse.json(data, { status: 200 })
}