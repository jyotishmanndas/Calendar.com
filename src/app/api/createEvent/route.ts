import { CurrentProfile } from "@/lib/currentProfile";
import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const profile = await CurrentProfile();
    if (!profile) {
        return new NextResponse("Unauthorized", { status: 401 })
    };

    try {
        const { title, url, description, duration, videoCallProvider } = await req.json();

        const availability = await prisma.availability.findFirst({
            where: {
                userId: profile.id
            }
        });

        const event = await prisma.event.create({
            data: {
                title,
                description,
                url,
                duration,
                videoCallProvider,
                userId: profile.id,
                availabilityId: availability?.id
            }
        });
        return NextResponse.json(event, { status: 200 })

    } catch (error) {
        return new NextResponse("Internal error", { status: 500 })
    }
}